import { Injectable } from '@nestjs/common';
import { Config } from './constants';

@Injectable()
export class AppService {

    constructor() {
    }

    public getHello(): string {
        return Config.VERSION;
    }

}
