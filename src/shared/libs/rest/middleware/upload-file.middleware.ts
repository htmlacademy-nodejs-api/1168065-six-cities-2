import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import { Middleware } from './middleware.interface.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    private readonly allowedMimeTypes: string[],
    private readonly maxFileSize: number,
  ) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtention = extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${fileExtention}`);
      },
    });

    const uploadSingleFileMiddleware = multer({
      storage,
      limits: {
        fileSize: this.maxFileSize,
      },
      fileFilter: (_req, file, callback) => {
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new HttpError(
              StatusCodes.BAD_REQUEST,
              'Invalid file type',
              'UploadFileMiddleware',
            ),
          );
        }

        callback(null, true);
      },
    }).single(this.fieldName);

    uploadSingleFileMiddleware(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return next(
            new HttpError(
              StatusCodes.BAD_REQUEST,
              'File is too large',
              'UploadFileMiddleware',
            ),
          );
        }
      }

      if (error) {
        return next(error);
      }

      return next();
    });
  }
}
