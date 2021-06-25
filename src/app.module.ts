import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Route } from './entities/route.entity';
import { StopTime } from './entities/stop-time.entity';
import { Trip } from './entities/trip.entity';
import { RssService } from './endpoints/rss/rss.service';
import { RssController } from './endpoints/rss/rss.controller';
import { Stop } from './entities/stop.entity';

export const VERSION: string = '0.0.2';

@Module({
    imports: [
        TypeOrmModule.forRoot({

            type: 'mysql',
            host: process.env.MYSQL_HOST || 'localhost',
            port: 3306,
            database: process.env.MYSQL_DATABASE || 'zastavky',
            username: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || 'Heslo123,',
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
            Stop
        ]),
    ],
    controllers: [AppController, RssController],
    providers: [AppService, RssService],
})
export class AppModule {
}
