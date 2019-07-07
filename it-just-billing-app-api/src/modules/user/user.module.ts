import { UserResolver } from './resolvers/user.resolver';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  //   controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
