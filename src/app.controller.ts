import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    public getHello(): string {
        return this.appService.getHello();
    }

    public onModuleInit(): any {
        this.appService.appStarted();
    }

}
