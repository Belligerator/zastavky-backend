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
import { ServerRestarts } from './entities/server-restarts.entity';
import * as connectionOptions from './ormconfig';
import { BasicStrategy } from './endpoints/auth/strategies/basic.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot(connectionOptions),
        TypeOrmModule.forFeature([
            Calendar,
            Route,
            StopTime,
            Trip,
            Stop,
            ServerRestarts,
        ]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'jwtPayload',
            session: false,
        }),
    ],
    controllers: [AppController, RssController, StoptimesController],
    providers: [AppService, RssService, StoptimesService, CronJobsService, BasicStrategy],
})
export class AppModule {
}

export const BASIC_USERNAME: string = process.env.BASIC_USERNAME;
export const BASIC_PASSWORD: string = process.env.BASIC_PASSWORD;
