module.exports = {
  type: 'mysql',
  port: 3307,
  host: '127.0.0.1',
  username: 'root',
  password: 'E1fc3b6@!',
  database: 'brechore-db',
  //banco de dados localhost:
  // host: 'localhost',
  // username: 'root',
  // password: 'e1fc3b62',
  // database: 'restore',
  //banco de dados do heroku:
  // host: 'grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  // username: 't4rh61y2mn9b24z2',
  // password: 'd5f3pyq6zefgf2wk',
  // database: 'p322gwo28a6b4don',
  // entities: ['./src/models/*.ts'],
  // migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  entities: [__dirname + '/dist/models/*.js'],
  migrations: ['./dist/database/migrations/*.js'],
};
