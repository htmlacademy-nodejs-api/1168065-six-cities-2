import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { OfferService } from '../offer/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {}

  public async create(
    dto: CreateCommentDTO,
  ): Promise<DocumentType<CommentEntity>> {
    const { offerId } = dto;

    const offerExists = await this.offerService.exists(offerId);

    if (!offerExists) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer ${offerId} not found`,
        'CommentService',
      );
    }

    const comment = await this.commentModel.create(dto);
    await this.offerService.updateOfferStats(offerId);

    return comment.populate('userId');
  }

  public async findByOfferId(
    offerId: string,
    count?: number,
  ): Promise<DocumentType<CommentEntity>[]> {
    const query = this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .populate('userId');

    if (count) {
      query.limit(count);
    }

    return query.exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  }
}
