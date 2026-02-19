import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ✅ Register new admin
  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: { name, email, password: hashed },
    });

    return {
      status: 'success',
      message: 'Admin registered successfully',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      }, // 👈 password hidden
    };
  }

  // ✅ Login admin
  async login(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: admin.id, email: admin.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      status: 'success',
      message: 'Login successful',
      access_token: token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }
   async getAllAdmins() {
    const admins = await this.prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return admins;
  }

  // ✅ Update admin
  async updateAdmin(
    id: number,
    data: { name?: string; email?: string; password?: string },
  ) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true }, // hide password
    });

    return {
      status: 'success',
      message: 'Admin updated successfully',
      admin: updatedAdmin,
    };
  }

  // ✅ Delete admin
  async deleteAdmin(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');

    await this.prisma.admin.delete({ where: { id } });

    return { status: 'success', message: 'Admin deleted successfully' };
  }
}
