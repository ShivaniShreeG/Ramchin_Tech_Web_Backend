import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('create')
  async create(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }
   @Get('all')
  async getAll() {
    return this.contactService.getAll();
  }

   @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactService.delete(Number(id));
  }
}
