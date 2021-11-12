import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ExtendedHttpException } from '../../models/http-exception';
import { StopTime } from '../../entities/stop-time.entity';
import { StoptimesService } from './stoptimes.service';

@Controller('stoptimes')
export class StoptimesController {
    constructor(private readonly stoptimesService: StoptimesService) {
    }

    @Get('start-job')
    public startJob(): Promise<void> {
        return this.stoptimesService.pidOpendataDownloadingJob()
            .catch(error => {
                console.error(`test error`, error);
                throw new ExtendedHttpException(
                    error,
                    `GET /start-job ERROR:`,
                    {
                        error: error?.message,
                        message: error?.message || 'Cannot start job.',
                        title: error?.title || 'Error.',
                    }, error.statusCode || 500);
            });
    }

    @Get('by-stop-id/:id')
    public byStopId(@Param('id') stopId: string, @Query('date') date: string): Promise<StopTime[]> {
        return this.stoptimesService.getTimesByStopId(stopId, date)
            .catch(error => {
                console.error(`test error`, error);
                throw new ExtendedHttpException(
                    error,
                    `POST /by-stop-id/${stopId} ERROR:`,
                    {
                        error: error?.message,
                        message: error?.message || 'Cannot get stop times.',
                        title: error?.title || 'Error.',
                    }, error.statusCode || 500);
            });
    }

    @Post('by-coordinates')
    public byCoordinates(@Body('date') date: string, @Body('lat') lat: number, @Body('lon') lon: number): Promise<{ station: string, distance: number, stoptimes: StopTime[] }> {
        return this.stoptimesService.getTimesByCoordinates(date, lat, lon)
            .catch(error => {
                throw new ExtendedHttpException(
                    error,
                    `POST /by-coordinates ERROR:`,
                    {
                        error: error?.message,
                        message: error?.message || 'Cannot get stop times.',
                        title: error?.title || 'Error.',
                    }, error.statusCode || 500);
            });
    }
}
