import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      JWT_TOKEN_EXPIRES_IN: Joi.number().default(3600),
      JWT_SECRET: Joi.string().required(),
      // GOOGLE ENV VARIABLES
      GOOGLE_CIELNT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),
      GOOGLE_CALLBACK_URL: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get GoogleClientId(): String {
    return String(this.envConfig.GOOGLE_CIELNT_ID);
  }

  get GoogleClientSecret(): String {
    return String(this.envConfig.GOOGLE_CLIENT_SECRET);
  }

  get GoogleCallbackUrl(): String {
    return String(this.envConfig.GOOGLE_CALLBACK_URL);
  }
  get JwtSecret(): String {
    return String(this.envConfig.JWT_SECRET);
  }
  get JwtTokenExpiresIn(): number {
    return Number(this.envConfig.JWT_TOKEN_EXPIRES_IN);
  }
}
