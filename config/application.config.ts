export default () => ({
  app: {
    name: process.env.APP_NAME || 'FB',
    port: process.env.APP_PORT || 3300,
  },
  auth: {
    secret: process.env.AUTH_KEY || '^123.456@abc$',
    expiresIn: process.env.AUTH_EXP || 1800,
  },
  database: {
    mongodb: {
      host: process.env.DB_MONGO_HOST,
      port: process.env.DB_MONGO_PORT,
      name: process.env.DB_MONGO_NAME || 'bigbom',
      rs: process.env.DB_MONGO_RS,
      username: process.env.DB_MONGO_USERNAME,
      password: process.env.DB_MONGO_PASSWORD,
      nodes: process.env.DB_MONGO_NODES,
    },
  },
  cache: {
    redis: {
      host: process.env.CACHE_REDIS_HOST,
      port: process.env.CACHE_REDIS_PORT,
      db: process.env.CACHE_REDIS_DB,
      password: process.env.CACHE_REDIS_PASSWORD,
    },
  },
  facebook: {
    graphVersion: process.env.FB_GRAPH_VERSION || 'v13.0',
    appId: process.env.FB_APP_ID,
  },
});
