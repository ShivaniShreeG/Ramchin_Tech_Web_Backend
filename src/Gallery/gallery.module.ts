import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),],
  controllers: [GalleryController],
  providers: [GalleryService,PrismaService,ConfigService],
})
export class GalleryModule {}