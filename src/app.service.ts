import { Injectable } from '@nestjs/common';
import { VERSION } from './app.module';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { StopTime } from './entities/stop-time.entity';
import { InjectRepository } from '@nestjs/typeorm';
import moment = require('moment');

@Injectable()
export class AppService {

    private days: { [day: number]: string } = {
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday',
        0: 'sunday',
    };

    constructor(
        @InjectRepository(StopTime) private stopTimesRepository: Repository<StopTime>,
    ) {
    }

    public getHello(): string {
        return VERSION;
    }

    public async getTimesByStopId(stopId: string, time: string, day: number): Promise<StopTime[]> {
        console.log('time: ' + time);
        console.log('day: ' + this.days[day]);
        console.log('Find stop: ', stopId);
        const qBuilder: SelectQueryBuilder<StopTime> = await this.stopTimesRepository
            .createQueryBuilder('stop_times')
            .leftJoinAndSelect('stop_times.trip', 'trip')
            .leftJoinAndSelect('trip.route', 'route')
            .leftJoinAndSelect('trip.service', 'calendar')
            .where(`stop_times.stop_id = "${stopId}"`)
            .andWhere(`stop_times.departure_time >= '${time}'`)
            .andWhere(`calendar.${this.days[day]} = 1`)
            .orderBy('stop_times.departure_time')
            .take(5);

        const stopTimes: StopTime[] = await qBuilder.getMany();
        stopTimes.forEach(st => {
            const dummyDate: string = '2020-01-01T';
            const timeNow: string = time;
            const a: moment.Moment = moment(dummyDate + st.departure_time);
            const b: moment.Moment = moment(dummyDate + timeNow);
            const diff: number = a.diff(b, 'minutes');
            st.departure_time = st.departure_time.substring(0, 5) + ` (za ${diff} min)`;
        });
        return stopTimes;
    }
}
