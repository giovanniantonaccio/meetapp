require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || '5432',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: process.env.DB_LOGGING === 'true',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
