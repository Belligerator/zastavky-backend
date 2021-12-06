import { Injectable } from '@nestjs/common';
import { Config } from './constants';
import { ServerRestarts } from './entities/server-restarts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

    constructor(@InjectRepository(ServerRestarts) private opportunityRepository: Repository<ServerRestarts>) {
    }

    public getHello(): string {
        return Config.VERSION;
    }

    public appStarted(): void {
        this.opportunityRepository.insert({ version: Config.VERSION });

    }
}
