import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const category = req.body.category;
          const service = new UploadService();

          try {
            const uploadPath = service.getUploadPath(category);
            cb(null, uploadPath);
          } catch (error) {
            cb(error, '');
          }
        },
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),

      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.startsWith('image/') ||
          file.mimetype ===
            'application/vnd.android.package-archive'
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid file type'), false);
        }
      },

      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const category = req.body.category;

    const url = this.uploadService.generateFileUrl(
      category,
      file.filename,
    );

    return {
      message: 'File uploaded successfully',
      url,
    };
  }
}
