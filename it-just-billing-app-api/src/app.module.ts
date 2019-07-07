import { AuthService } from './modules/auth/services/auth.service';
import { GoogleStrategy } from './modules/auth/strategies/google.strategy';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, GoogleStrategy],
})
export class AppModule {}
