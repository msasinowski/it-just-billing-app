import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUser } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUser): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserByThirdPartyId(
    thirdPartyId: String,
    provider: String,
  ): Promise<User> {
    return await this.userModel.find({ thirdPartyId, provider });
  }
}
