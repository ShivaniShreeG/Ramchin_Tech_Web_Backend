import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AdminAuthService } from './adminAuth.service';

@Controller('Adminauth')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('register')
  async register(@Body() body: {name: string; email: string; password: string }) {
    return this.authService.register(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

    // ✅ Get all admins
  @Get('all')
  async getAllAdmins() {
    return this.authService.getAllAdmins();
  }

  @Put(':id')
  async updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; email?: string; password?: string },
  ) {
    return this.authService.updateAdmin(id, body);
  }

  // ✅ Delete admin by ID
  @Delete(':id')
  async deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteAdmin(id);
  }
}
