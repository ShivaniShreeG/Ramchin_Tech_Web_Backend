import { Injectable, BadRequestException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  getUploadPath(category: string): string {
    if (!category) {
      throw new BadRequestException('Category is required');
    }

    const uploadPath = join(
      '/var/www/html/companyweb/',
      category,
    );

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    return uploadPath;
  }

  generateFileUrl(category: string, filename: string): string {
    return `https://yourdomain.com/${category}/${filename}`;
  }
}
