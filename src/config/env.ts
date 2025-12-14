import dotenv from "dotenv";
dotenv.config();

type EnvVariables = {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  PORT: number;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
};

const getEnvVar = <K extends keyof EnvVariables>(key: K): EnvVariables[K] => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable "${key}" is not set.`);

  if (key === "PORT") return Number(value) as EnvVariables[K];
  return value as EnvVariables[K];
};

export const Config = Object.freeze({
  get: getEnvVar,
});
