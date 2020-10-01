import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Route } from './entities/route.entity';
import { StopTime } from './entities/stop-time.entity';
import { Trip } from './entities/trip.entity';

export const VERSION: string = '0.0.1';

@Module({
    imports: [
        TypeOrmModule.forRoot({

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
            synchronize: false,   // todo nepouzivat na produkci
        }),
        TypeOrmModule.forFeature([
            Calendar,
            Route,
            StopTime,
            Trip,
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
