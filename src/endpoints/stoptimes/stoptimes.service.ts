import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from 'moment';
import * as fs from 'fs';
import { StopTime } from '../../entities/stop-time.entity';
import { Stop } from '../../entities/stop.entity';
import { Trip } from '../../entities/trip.entity';
import { Calendar } from '../../entities/calendar.entity';
import { Route } from '../../entities/route.entity';
import moment = require('moment');
import { StoptimesResponse } from '../../models/stoptimes-response';

const extract = require('extract-zip');
const request = require('superagent');

@Injectable()
export class StoptimesService {

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
        @InjectRepository(Trip) private tripsRepository: Repository<Trip>,
        @InjectRepository(Calendar) private calendarRepository: Repository<Calendar>,
        @InjectRepository(Route) private routeRepository: Repository<Route>,
    ) {
    }

    public async pidOpendataDownloadingJob(): Promise<void> {
        console.log('Start downloading zip: ' + moment().format());
        request
            .get('http://data.pid.cz/PID_GTFS.zip')
            .on('error', (error) => {
                console.error('Error during zip downloading', error);
            })
	    .pipe(fs.createWriteStream(process.cwd() + '/data.zip'))
            .on('finish', () => {
	    	console.log('Zip downloaded', process.cwd());
		extract(process.cwd() + '/data.zip', { dir: process.cwd() + '/data' })
                    .then((data) => {
                        console.log('Zip extracted');
                        this.importDatabase();
                    })
                    .catch(error => {
                        console.error('Error during zip extraction', error);
                    });
            });
    }

    /**
     * Funkce smaze data z tabulek a nahraje ze souboru nova data.
     * TODO: Udelat pomocne tabulky a mazat az pote, co budou nahrana nova data.
     */
    public async importDatabase(): Promise<void> {
        let t0 = moment().valueOf();

        await this.calendarRepository.query('SET FOREIGN_KEY_CHECKS = 0;');
        await this.calendarRepository.clear();
        await this.routeRepository.clear();
        await this.stopsRepository.clear();
        await this.tripsRepository.clear();
        await this.stopTimesRepository.clear();
        await this.calendarRepository.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.log('DB deleted');
	    console.log(await this.calendarRepository.query(`LOAD DATA LOCAL INFILE '${process.cwd()}/data/calendar.txt' INTO TABLE calendar FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES;`));
        console.log(await this.routeRepository.query(`LOAD DATA LOCAL INFILE '${process.cwd()}/data/routes.txt' INTO TABLE routes FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES;`));
        console.log(await this.stopsRepository.query(`LOAD DATA LOCAL INFILE '${process.cwd()}/data/stops.txt' INTO TABLE stops FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES;`));
        console.log(await this.tripsRepository.query(`LOAD DATA LOCAL INFILE '${process.cwd()}/data/trips.txt' INTO TABLE trips FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES;`));
        console.log(await this.stopTimesRepository.query(`LOAD DATA LOCAL INFILE '${process.cwd()}/data/stop_times.txt' INTO TABLE stop_times FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES;`));

        let t1 = moment().valueOf();
        console.log('Import completed: ' + (t1 - t0) + ' ms');
    }

    public async getTimesByCoordinates(date: string, lat: number, lon: number): Promise<StoptimesResponse[]> {
        const res: Stop[] = await this.stopsRepository.query(
            `SELECT *, ST_Distance_Sphere( point ('${lon}', '${lat}'), point(stop_lon, stop_lat)) AS distance_in_meters
            FROM stops
            WHERE location_type = 0
            ORDER BY distance_in_meters ASC LIMIT 5;`);
        let response: StoptimesResponse[] = [];
        if (res?.length) {
            for (let item of res) {
                const stoptimes: StopTime[] = await this.getTimesByStopId(item.stop_id, date);
                response.push({
                    station: `${item.stop_name}${item.platform_code ? ' (' + item.platform_code + ')' : ''}`,
                    distance: Math.round(item.distance_in_meters),
                    stoptimes: stoptimes,
                });
            }
        }
        return response;
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
            .where(`stop_times.stop_id = "${stopId}"`)
            .andWhere(`stop_times.departure_time >= '${time}'`)
            .leftJoinAndSelect('stop_times.trip', 'trip')
            .leftJoinAndSelect('trip.route', 'route')
            .leftJoinAndSelect('trip.service', 'calendar')
            .andWhere(`calendar.${this.days[day]} = 1`)
            .andWhere(`calendar.start_date <= '${date}'`)
            .andWhere(`calendar.end_date >= '${date}'`)
            .orderBy('stop_times.departure_time')
            .take(5);

        const stopTimes: StopTime[] = await qBuilder.getMany();
        stopTimes.forEach(st => {
            // todo: opravit casy po pulnoci
        });
        return stopTimes;
    }
}
