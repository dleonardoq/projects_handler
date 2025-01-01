import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;
  MONGO_USER: string;
  MONGO_PASSWORD: string;
  MONGO_HOST: string;
  MONGO_DB: string;
  MONGO_PORT: number;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    MONGO_USER: joi.string().required(),
    MONGO_PASSWORD: joi.string().required(),
    MONGO_HOST: joi.string().required(),
    MONGO_DB: joi.string().required(),
    MONGO_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error \${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  host: envVars.HOST,
  mongoUser: envVars.MONGO_USER,
  mongoPassword: envVars.MONGO_PASSWORD,
  mongoHost: envVars.MONGO_HOST,
  mongoDb: envVars.MONGO_DB,
  mongoPort: envVars.MONGO_PORT,
};
