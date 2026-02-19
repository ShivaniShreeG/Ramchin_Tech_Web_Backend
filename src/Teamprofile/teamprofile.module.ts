import { Module } from '@nestjs/common';
import { TeamProfileController } from './teamprofile.controller';
import { TeamProfileService } from './teamprofile.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TeamProfileController],
  providers: [TeamProfileService, PrismaService],
})
export class TeamProfileModule {}
