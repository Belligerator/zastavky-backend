import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { BASIC_PASSWORD, BASIC_USERNAME } from '../../../app.module';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
    constructor() {
        console.log('Hello Basic Strategy');
        super();
    }

    public async validate(username: string, password: string): Promise<any> {
        if (BASIC_USERNAME && BASIC_PASSWORD && username === BASIC_USERNAME && password === BASIC_PASSWORD) {
            console.log('Basic strategy validated');
            return true;
        } else {
            console.log('Basic strategy not validated');
            return false;
        }
    }

}
