import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TeamProfileService } from './teamprofile.service';
import { CreateTeamProfileDto } from './dto/create-teamprofile.dto';

@Controller('teamprofile')
export class TeamProfileController {
  constructor(private readonly teamProfileService: TeamProfileService) {}

  @Post()
  create(@Body() dto: CreateTeamProfileDto) {
    return this.teamProfileService.create(dto);
  }

  @Get()
  findAll() {
    return this.teamProfileService.findAll();
  }
   // ✅ Update by id
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateTeamProfileDto) {
    return this.teamProfileService.update(+id, dto);
  }

  // ✅ Delete by id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamProfileService.remove(+id);
  }
}
