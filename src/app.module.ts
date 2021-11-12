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
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { StoptimesController } from './endpoints/stoptimes/stoptimes.controller';
import { StoptimesService } from './endpoints/stoptimes/stoptimes.service';
import { CronJobsService } from './services/cron-jobs.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
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
            Stop,
        ]),
    ],
    controllers: [AppController, RssController, StoptimesController],
    providers: [AppService, RssService, StoptimesService, CronJobsService],
})
export class AppModule {
}
