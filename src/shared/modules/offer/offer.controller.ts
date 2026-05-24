import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  ALLOWED_IMAGES,
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  MAX_SINGLE_FILE_SIZE,
  PrivateRouteMiddleware,
  RequestQuery,
  UploadFileMiddleware,
  UploadFilesMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { City, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { CommentRdo, CommentService } from '../comment/index.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { FavoriteService } from '../favorite/index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { OFFER_IMAGES_LENGTH } from './offer.constant.js';
import { UploadImagesRdo } from './rdo/upload-images.rdo.js';
import { UploadPreviewRdo } from './rdo/upload-preview.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
    @inject(Component.FavoriteService)
    private readonly favoriteService: FavoriteService,
    @inject(Component.Config)
    private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumOffersByCity,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDTO),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/preview',
      method: HttpMethod.Post,
      handler: this.uploadPreview,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'preview',
          ALLOWED_IMAGES,
          MAX_SINGLE_FILE_SIZE,
        ),
      ],
    });
    this.addRoute({
      path: '/:offerId/images',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFilesMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'images',
          ALLOWED_IMAGES,
          MAX_SINGLE_FILE_SIZE,
          OFFER_IMAGES_LENGTH,
        ),
      ],
    });
  }

  public async show(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const userId = tokenPayload?.id;
    const offer = await this.offerService.findById(offerId, userId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      userId: tokenPayload.id,
    });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async index(
    {
      query,
      tokenPayload,
    }: Request<ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const userId = tokenPayload?.id;
    const offers = await this.offerService.find(query?.limit, userId);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async delete(
    { params }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    await this.favoriteService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDTO>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments(
    { params }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getPremiumOffersByCity(
    {
      query,
      tokenPayload,
    }: Request<ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const city = String(query.city).trim() as City;
    const userId = tokenPayload?.id;
    const limit = query.limit && Number(query.limit);

    if (!city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'City is missing or incorrect',
        'OfferController',
      );
    }

    const premiumOffersByCity = await this.offerService.findPremiumByCity(
      city,
      userId,
      limit,
    );
    this.ok(res, fillDTO(OfferRdo, premiumOffersByCity));
  }

  public async addFavorite(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const favorite = await this.favoriteService.add(
      tokenPayload.id,
      params.offerId,
    );
    this.noContent(res, favorite);
  }

  public async deleteFavorite(
    { params, tokenPayload }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const favorite = await this.favoriteService.delete(
      tokenPayload.id,
      params.offerId,
    );
    this.noContent(res, favorite);
  }

  public async getFavorites(
    { tokenPayload }: Request,
    res: Response,
  ): Promise<void> {
    const offers = await this.favoriteService.getOffers(tokenPayload.id);

    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async uploadPreview(
    { params, file }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;

    if (!file) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Preview image is required',
        'OfferController',
      );
    }

    const updatedOffer = await this.offerService.updateById(offerId, {
      previewImage: file.filename,
    });
    const previewRdo = fillDTO(UploadPreviewRdo, updatedOffer);
    this.created(res, previewRdo);
  }

  public async uploadImages(
    { params, files }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const filesToUpload = Array.isArray(files) ? files : undefined;

    if (!filesToUpload || filesToUpload.length !== OFFER_IMAGES_LENGTH) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Images must contain exactly ${OFFER_IMAGES_LENGTH} items`,
        'OfferController',
      );
    }

    const images = filesToUpload.map((file) => file.filename);
    const updatedOffer = await this.offerService.updateById(offerId, {
      images,
    });
    const imagesRdo = fillDTO(UploadImagesRdo, updatedOffer);
    this.created(res, imagesRdo);
  }
}
