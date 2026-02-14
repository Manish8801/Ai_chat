function getEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  BETTER_AUTH_SECRET: getEnv("BETTER_AUTH_SECRET"),
  DATABASE_URL: `postgresql://${getEnv("POSTGRES_USER")}:${getEnv("POSTGRES_PASSWORD")}@localhost:5433/${getEnv("POSTGRES_DB")}`,
  GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  OPENROUTER_API_KEY: getEnv("OPENROUTER_API_KEY"),
} as const;
