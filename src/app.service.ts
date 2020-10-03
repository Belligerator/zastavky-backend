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
            .leftJoinAndSelect('stop_times.trip', 'trip')
            .leftJoinAndSelect('trip.route', 'route')
            .leftJoinAndSelect('trip.service', 'calendar')
            .where('stop_times.stop_id = "U953Z102"')
            .andWhere('calendar.monday = 1')
            .orderBy('stop_times.departure_time')
            .take(5);
        return await qBuilder.getMany();
    }
}
