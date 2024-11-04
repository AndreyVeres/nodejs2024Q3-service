declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      PORT_POSTGRES: number;
      CRYPT_SALT: number;
      POSTGRES_PASSWORD: string;
      PGADMIN_DEFAULT_EMAIL: string;
      PGADMIN_DEFAULT_PASSWORD: string;
    }
  }
}

export {};
