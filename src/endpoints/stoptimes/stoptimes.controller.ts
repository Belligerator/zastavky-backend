import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ExtendedHttpException } from '../../models/http-exception';
import { StopTime } from '../../entities/stop-time.entity';
import { StoptimesService } from './stoptimes.service';
import { StoptimesResponse } from '../../models/stoptimes-response';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard(['basic']))
@Controller('stoptimes')
export class StoptimesController {
    constructor(private readonly stoptimesService: StoptimesService) {
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
    public byCoordinates(@Body('date') date: string, @Body('lat') lat: number, @Body('lon') lon: number): Promise<StoptimesResponse[]> {
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
