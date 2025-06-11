export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
  vnpay: {
    tmn_code: process.env.VNP_TMN_CODE,
    hash_secret: process.env.VNP_HASH_SECRET,
    url: process.env.VNP_URL,
    return_url: process.env.VNP_RETURN_URL,
  },
}); 