import { Provider } from './../services/auth.service';
import { ConfigService } from './../../config/services/config.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.GoogleClientId, // <- Replace this with your client id
      clientSecret: config.GoogleClientSecret, // <- Replace this with your client secret
      callbackURL: config.GoogleCallbackUrl,
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: Function,
  ) {
    try {
      console.log(profile);
      const jwt: string = await this.authService.validateOAuthLogin(
        profile.id,
        Provider.GOOGLE,
      );
      const user = {
        jwt,
      };

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
