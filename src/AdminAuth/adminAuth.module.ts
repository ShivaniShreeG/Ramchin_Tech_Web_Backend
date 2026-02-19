import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { AdminAuthService } from './adminAuth.service';
import { AdminAuthController } from './adminAuth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AdminAuthService, PrismaService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
