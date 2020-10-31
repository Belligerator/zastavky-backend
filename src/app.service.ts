import { Injectable } from '@nestjs/common';
import { VERSION } from './app.module';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { StopTime } from './entities/stop-time.entity';
import { InjectRepository } from '@nestjs/typeorm';
import moment = require('moment');

@Injectable()
export class AppService {

    private days: {[day: number]: string} = {
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday',
        7: 'sunday'
    };

    constructor(
        @InjectRepository(StopTime) private stopTimesRepository: Repository<StopTime>,
    ) {
    }

    public getHello(): string {
        return VERSION;
    }

    public async getTimesByStopId(stopId: string): Promise<StopTime[]> {
        const now: moment.Moment = moment();
        const day = now.day();
        console.log('Find stop: ', stopId);
        const qBuilder: SelectQueryBuilder<StopTime> = await this.stopTimesRepository
            .createQueryBuilder('stop_times')
            .leftJoinAndSelect('stop_times.trip', 'trip')
            .leftJoinAndSelect('trip.route', 'route')
            .leftJoinAndSelect('trip.service', 'calendar')
            .select([
                'stop_times.id',
                'stop_times.departure_time',
                'trip.trip_id',
                'route.route_id',
                'route.route_short_name',
                'route.route_long_name',
            ])
            .where(`stop_times.stop_id = "${stopId}"`)
            .andWhere(`stop_times.departure_time >= '${now.format('HH:mm:ss')}'`)
            .andWhere(`calendar.${this.days[day]} = 1`)
            .orderBy('stop_times.departure_time')
            .take(5);
        return await qBuilder.getMany();
    }
}
