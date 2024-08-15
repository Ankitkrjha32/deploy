export const USER_API_END_POINT = process.env.NODE_ENV === 'production' 
  ? 'https://deploy-dun-nine.vercel.app/api/v1/user' 
  : 'http://localhost:8000/api/v1/user';
