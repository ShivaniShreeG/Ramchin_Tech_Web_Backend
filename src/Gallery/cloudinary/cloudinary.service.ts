// import { Injectable } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class CloudinaryService {
//   constructor(private config: ConfigService) {
//    cloudinary.config({
//   cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
//   api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
//   api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
// });
//   }

//   async uploadImage(file: Express.Multer.File): Promise<string> {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ folder: 'gallery' }, (error, result) => {
//           if (error) return reject(error);
//           resolve(result.secure_url);
//         })
//         .end(file.buffer);
//     });
//   }
// }
