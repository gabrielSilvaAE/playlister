/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HARMIX_API_KEY: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}