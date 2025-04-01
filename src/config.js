const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev
  ? 'http://localhost:5000/jamendo'
  : 'https://api.jamendo.com/v3.0';

export const JAMENDO_CLIENT_ID = 'fc610b1f';
