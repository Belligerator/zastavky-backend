import { ConnectionOptions } from 'typeorm';
require("dotenv").config();

const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    entities: [
        __dirname + '/endpoints/**/*.entity{.ts,.js}',
        __dirname + '/entities/**/*.entity{.ts,.js}',
    ],
    migrations: [
        __dirname + '/migrations/*{.ts,.js}',
    ],
    cli: {
        migrationsDir: 'src/migrations'
    },
    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    dropSchema: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
};

export = connectionOptions;
