import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;
  PROJECTS_MICROSERVICE_PORT: number;
  PROJECTS_MICROSERVICE_HOST: string;
  TASKS_MICROSERVICE_PORT: number;
  TASKS_MICROSERVICE_HOST: string;
  USERS_MICROSERVICE_PORT: number;
  USERS_MICROSERVICE_HOST: string;
  REDIS_PORT: number;
  REDIS_HOST: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST: joi.string().required(),
    PROJECTS_MICROSERVICE_PORT: joi.number().required(),
    PROJECTS_MICROSERVICE_HOST: joi.string().required(),
    TASKS_MICROSERVICE_PORT: joi.number().required(),
    TASKS_MICROSERVICE_HOST: joi.string().required(),
    USERS_MICROSERVICE_PORT: joi.number().required(),
    USERS_MICROSERVICE_HOST: joi.string().required(),
    REDIS_PORT: joi.number().required(),
    REDIS_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  host: envVars.HOST,
  projectsMicroservicePort: envVars.PROJECTS_MICROSERVICE_PORT,
  projectsMicroserviceHost: envVars.PROJECTS_MICROSERVICE_HOST,
  tasksMicroservicePort: envVars.TASKS_MICROSERVICE_PORT,
  tasksMicroserviceHost: envVars.TASKS_MICROSERVICE_HOST,
  usersMicroservicePort: envVars.USERS_MICROSERVICE_PORT,
  usersMicroserviceHost: envVars.USERS_MICROSERVICE_HOST,
  redisPort: envVars.REDIS_PORT,
  redisHost: envVars.REDIS_HOST,
};
