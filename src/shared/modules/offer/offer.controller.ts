import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestQuery,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { DEFAULT_OFFER_COUNT } from './offer.constants.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
  }

  public async show(
    { params }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;

    // TODO: разобраться с юнион типом ParamOfferId
    if (Array.isArray(offerId)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offerId format',
        'OfferController',
      );
    }

    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async index(
    { query }: Request<ParamsDictionary, unknown, unknown, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.find(query?.limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async delete(
    { params }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;

    // TODO: разобраться с юнион типом ParamOfferId
    if (Array.isArray(offerId)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offerId format',
        'OfferController',
      );
    }

    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController',
      );
    }

    this.noContent(res, offer);
  }

  public async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDTO>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;

    // TODO: разобраться с юнион типом ParamOfferId
    if (Array.isArray(offerId)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid offerId format',
        'OfferController',
      );
    }

    const updatedOffer = await this.offerService.updateById(offerId, body);

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }
}
