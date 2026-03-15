export interface SERVER_Config {
  port: number;
  nodeEnv: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  MAX_AGE: number;
}
