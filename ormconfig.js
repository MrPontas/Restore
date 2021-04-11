module.exports = {
  type: 'mysql',
  host: 'cdbr-east-03.cleardb.com',
  port: 3306,
  // username: 'brechore_api',
  // password: 'E1fc3b6@!',
  // database: 'brechore_db',
  username: 'b1943ae9069626',
  password: 'b047ebf6',
  database: 'heroku_fd28c35d8956b61',
  // entities: ['./src/models/*.ts'],
  // migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  entities: [__dirname + '/dist/models/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
};
