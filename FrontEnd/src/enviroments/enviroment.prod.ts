export const environment = {
    production: true,
    PROXY_URL: import.meta.env.NG_APP_PROXY_URL || '',
    API_KEY: import.meta.env.NG_APP_API_KEY || '',
    AUTH_DOMAIN: import.meta.env.NG_APP_AUTH_DOMAIN || '',
    PROJECT_ID: import.meta.env.NG_APP_PROJECT_ID || '',
    STORAGE_BUCKET: import.meta.env.NG_APP_STORAGE_BUCKET || '',
    MESSAGING_SENDER_ID: import.meta.env.NG_APP_MESSAGING_SENDER_ID || '',
    APP_ID: import.meta.env.NG_APP_ID || '',
    USER: {},
    USER_PHOTO_URL: '',
    USER_NAME: '',
    USER_EMAIL: '',
    USER_UID: '',
};
  