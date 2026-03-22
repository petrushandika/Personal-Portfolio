export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  ARTICLES: '/articles',
  PROJECTS: '/projects',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const APP_CONFIG = {
  NAME: 'Portfolio',
  DESCRIPTION: 'Personal Portfolio with CMS',
  AUTHOR: {
    NAME: 'Petrus Handika',
    EMAIL: 'petrushandikasinaga@gmail.com',
  },
} as const;
