declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGO_URL: string;
      JWT_SECRET: string;
      SESSION_SECRET: string;
      SECURE_COOKIE: boolean;
      REDIS_PORT: number;
      REDIS_URL: string;
      REDIS_PASSWORD: string;
      APPWRITE_URL: string;
      APPWRITE_PROJECT_ID: string;
      APPWRITE_BUCKET_SECRET: string;
      APPWRITE_TASK_IMAGE_BUCKET_ID: string;
      APPWRITE_DOCUMENT_BUCKET_ID: string;
      APPWRITE_PROFILE_IMAGE_BUCKET_ID: string;
    }
  }
}

export {};
