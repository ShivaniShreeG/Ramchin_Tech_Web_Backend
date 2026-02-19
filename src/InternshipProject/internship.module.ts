import { Module } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';
import { PrismaService } from '../prisma.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  controllers: [InternshipController],
  providers: [InternshipService, PrismaService,CloudinaryService],
})
export class InternshipModule {}
