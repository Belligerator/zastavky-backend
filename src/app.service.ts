import { Injectable } from '@nestjs/common';
import { VERSION } from './app.module';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { StopTime } from './entities/stop-time.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(StopTime) private stopTimesRepository: Repository<StopTime>,
    ) {
    }

    public getHello(): string {
        return VERSION;
    }

    public async test(): Promise<StopTime[]> {
        const qBuilder: SelectQueryBuilder<StopTime> = await this.stopTimesRepository.createQueryBuilder('stop_times');
        qBuilder
            .select([
                // 'stop_times.departure_time',
                'route.route_short_name',
                'route.route_long_name',
            ])
            .leftJoin('stop_times.trip', 'trip')
            .leftJoin('trip.route', 'route')
            // .leftJoin('trip.service', 'calendar')
            // .where('stop_times.stop_id = "U953Z102"')
            // .orderBy('departure_time')
            .take(1);
        console.log(qBuilder.getSql());
        return await qBuilder.getMany();
    }

    public async test2(): Promise<StopTime[]> {
        return await this.stopTimesRepository.find({ relations: ['trip'], take: 1 });
    }
}
