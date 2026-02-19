import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto) {
 
    const contact = await this.prisma.contact.create({ data });

    // Setup mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 1️⃣ Send confirmation to user
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`,
      to: data.email,
      subject: `Your message was sent successfully`,
      text: `Hi ${data.name},\n\nThank you for contacting us. We received your message:\n"${data.message}"\n\nWe’ll get back to you shortly.\n\nBest regards,\nSupport Team`,
    });

    // 2️⃣ Send actual message to admin
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `New Contact Message from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`,
    });

    return {status: 'Message sent successfully', contact};
  } 

  async getAll() {
  return this.prisma.contact.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      createdAt: true,
    },
  });
}

  async delete(id: number) {
  const contact = await this.prisma.contact.findUnique({ where: { id } });
  if (!contact) {
    throw new NotFoundException('Contact not found');
  }

  await this.prisma.contact.delete({ where: { id } });
  return { status: 'success', message: 'Contact deleted successfully' };
}
}
