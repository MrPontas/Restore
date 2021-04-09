module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  // username: 'brechore_api',
  // password: 'E1fc3b6@!',
  // database: 'brechore_db',
  username: 'root',
  password: 'e1fc3b62',
  database: 'restore',
  // entities: ['./src/models/*.ts'],
  // migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  entities: [__dirname + '/dist/models/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
};
