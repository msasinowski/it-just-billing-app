import { User } from './../../user/interfaces/user.interface';
import { UserService } from './../../user/services/user.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../config/services/config.service';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY: String;
  private readonly JWT_EXPIRES_IN: number;

  constructor(private config: ConfigService, private userService: UserService) {
    this.JWT_SECRET_KEY = config.JwtSecret;
    this.JWT_EXPIRES_IN = config.JwtTokenExpiresIn;
  }

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      const user: User = await this.userService.findUserByThirdPartyId(
        thirdPartyId,
        provider,
      );
      console.log({ user });
      if (!user) {
        const user: User = {
          thirdPartyId,
          provider,
        };
        console.log('asd');
        await this.userService.create(user);
      }

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: this.JWT_EXPIRES_IN,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
