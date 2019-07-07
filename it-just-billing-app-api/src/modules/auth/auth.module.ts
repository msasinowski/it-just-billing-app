import { UserModule } from './../user/user.module';
import { ConfigModule } from './../config/config.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
