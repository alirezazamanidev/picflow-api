declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: string;
    //DB
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    //REDIS
    REDIS_URL: string;
    // Auth
    OTP_EXPIRATION_MINUTES: number;
    JWT_SECRET_KEY:string
    // Smtp
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_SECURE: boolean;
    SMTP_PASSWORD: string;
    SMTP_USERNAME: string;
    // minio
    MINIO_BUCKET_NAME: string;
    MINIO_ENDPOINT: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
    MINIO_PORT: number;
  }
}
