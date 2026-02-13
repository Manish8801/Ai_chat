function getEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET"),
  GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID"),
  BETTER_AUTH_SECRET: getEnv("BETTER_AUTH_SECRET"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  DATABASE_URL: getEnv(
    `postgresql://${getEnv("POSTGRES_USER")}:${getEnv("POSTGRES_PASSWORD")}@localhost:5433/${getEnv("POSTGRES_DB")}`,
  ),
};
