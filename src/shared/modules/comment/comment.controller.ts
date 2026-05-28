import { Response } from 'express';
import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpMethod,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
  ) {
    super(logger);

    this.registerRoutes();
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response,
  ): Promise<void> {
    const comment = await this.commentService.create({
      ...body,
      userId: tokenPayload.id,
    });

    this.created(res, fillDTO(CommentRdo, comment));
  }

  private registerRoutes(): void {
    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDTO),
      ],
    });
  }
}
