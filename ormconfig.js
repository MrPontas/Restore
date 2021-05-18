module.exports = {
  type: 'mysql',
  port: 3306,
  // host: 'localhost',
  // username: 'node',
  // password: 'ahm*28bn',
  // database: 'restore',
  //banco de dados localhost:
  host: 'localhost',
  username: 'root',
  password: 'e1fc3b62',
  database: 'restore',
  //banco de dados do heroku:
  // host: 'grp6m5lz95d9exiz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  // username: 't4rh61y2mn9b24z2',
  // password: 'd5f3pyq6zefgf2wk',
  // database: 'p322gwo28a6b4don',
  //Para desenvolvimento
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  //Para produção
  // entities: [__dirname + '/dist/models/*.js'],
  // migrations: ['./dist/database/migrations/*.js'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
