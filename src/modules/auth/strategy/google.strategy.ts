import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // constructor(private readonly configService: ConfigService) {
  //   // super({
  //   //   clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
  //   //   clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
  //   //   callbackURL: 'http://localhost:3000/auth/google/callback',
  //   //   scope: ['email', 'profile'],
  //   // });
  // }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const user = {
      id,
      name: displayName,
      email: emails[0].value,
      photo: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
