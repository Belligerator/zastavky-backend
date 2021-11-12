import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StoptimesService } from '../endpoints/stoptimes/stoptimes.service';

@Injectable()
export class CronJobsService {

    constructor(
        private readonly stoptimesServices: StoptimesService,
    ) {
    }

    /**
     * Cron, which at every 3AM checks and download new data.
     */
    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    public async downloadAndImportNewDataCronJob(): Promise<void> {
        console.log('downloadAndImportNewData cron job');

        this.stoptimesServices.pidOpendataDownloadingJob();

    }

}
