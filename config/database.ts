export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DB_HOST', 'localhost'),
      port: env('DB_PORT', '3306'),
      user: env('DB_USER', 'root'),
      password: env('DB_PASS', 'example'),
      database: env('DB_NAME', 'travel-cms-dest'),
    },
    useNullAsDefault: true,
  },
});
