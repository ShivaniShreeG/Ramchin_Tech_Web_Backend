import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTeamProfileDto } from './dto/create-teamprofile.dto';

@Injectable()
export class TeamProfileService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTeamProfileDto) {
    return this.prisma.teamProfile.create({
      data: {
        name: dto.name,
        role: dto.role,
        image: dto.image, // ✅ convert base64 to Bytes
        bio: dto.bio,
        description: dto.description,
        projects: dto.projects ?? [],
        experience: dto.experience ?? [],
        resume: dto.resume,
        reviews: dto.reviews ?? [],
      },
    });
  }

  async findAll() {
    const profiles = await this.prisma.teamProfile.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // ✅ Convert Bytes back to base64 for frontend
    return profiles.map((p) => ({
      ...p,
      image: p.image ? p.image.toString() : null,
      resume: p.resume ? p.resume.toString() : null,
    }));
  }

  async update(id: number, dto: CreateTeamProfileDto) {
    return this.prisma.teamProfile.update({
      where: { id },
      data: {
        ...dto,
        image: dto.image ,
        resume: dto.resume
      },
    });
  }

  async remove(id: number) {
    return this.prisma.teamProfile.delete({
      where: { id },
    });
  }
}
