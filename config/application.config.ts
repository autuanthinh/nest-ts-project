export default () => ({
  auth: {
    secret: process.env.AUTH_KEY || '^123.456@abc$',
    expiresIn: process.env.AUTH_EXP || 1800,
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
});
