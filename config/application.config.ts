export default () => ({
  auth: {
    secret: process.env.AUTH_KEY || '^123.456@abc$',
    expiresIn: process.env.AUTH_EXPIRES_IN || 1800,
    ignoreExpiration:
      process.env.AUTH_IGNORE_EXPIRATION === 'true' ? true : false,
  },
  database: {
    postgres: {
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      autoLoadEntities: true,
    },
  },
  aws: {
    s3: {
      bucket: process.env.S3_BUCKET,
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
});
