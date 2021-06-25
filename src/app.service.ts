import { Injectable } from '@nestjs/common';
import { VERSION } from './app.module';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { StopTime } from './entities/stop-time.entity';
import { InjectRepository } from '@nestjs/typeorm';
import moment = require('moment');
import { Moment } from 'moment';
import { Stop } from './entities/stop.entity';

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
        @InjectRepository(Stop) private stopsRepository: Repository<Stop>,
    ) {
    }

    public getHello(): string {
        return VERSION;
    }

    public async getTimesByCoordinates(date: string, lat: number, lon: number): Promise<{ station: string, distance: number, stoptimes: StopTime[] }> {
        const res: Stop[] = await this.stopsRepository.query(
            `SELECT *, ST_Distance_Sphere( point ('${lon}', '${lat}'), point(stop_lon, stop_lat)) AS distance_in_meters
            FROM stops
            WHERE location_type = 0
            ORDER BY distance_in_meters ASC LIMIT 1;`);
        if (res?.length) {
            const stoptimes: StopTime[] = await this.getTimesByStopId(res[0].stop_id, date);
            return {
                station: res[0].stop_name,
                distance: res[0].distance_in_meters,
                stoptimes: stoptimes
            }
        }
        return {
            station: '',
            distance: 0,
            stoptimes: []
        };
    }

    public async getTimesByStopId(stopId: string, dateInput: string): Promise<StopTime[]> {
        const dateConverted: Moment = moment.parseZone(dateInput);
        const date: string = dateConverted.format('YYYYMMDD');
        const time: string = dateConverted.format('HH:mm');
        const day: number = dateConverted.day();
        console.log('Find stop: ', stopId);
        console.log('Time: ' + time);
        console.log('Day: ' + this.days[day]);
        const qBuilder: SelectQueryBuilder<StopTime> = await this.stopTimesRepository
            .createQueryBuilder('stop_times')
            .leftJoinAndSelect('stop_times.trip', 'trip')
            .leftJoinAndSelect('trip.route', 'route')
            .leftJoinAndSelect('trip.service', 'calendar')
            .where(`stop_times.stop_id = "${stopId}"`)
            .andWhere(`stop_times.departure_time >= '${time}'`)
            .andWhere(`calendar.${this.days[day]} = 1`)
            .andWhere(`calendar.start_date <= '${date}'`)
            .andWhere(`calendar.end_date >= '${date}'`)
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
