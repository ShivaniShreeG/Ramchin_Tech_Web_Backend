import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './Contact/contact.module';
import { AdminAuthModule } from './AdminAuth/adminAuth.module';
import { GalleryModule } from './Gallery/gallery.module';
import { TeamProfileModule} from './Teamprofile/teamprofile.module';
import { InternshipModule } from './InternshipProject/internship.module';
import { UploadModule } from './company/upload.module';

@Module({
  imports: [
    ContactModule,
    AdminAuthModule,
    GalleryModule,
    TeamProfileModule,
    InternshipModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
