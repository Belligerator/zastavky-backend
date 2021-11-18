import { StopTime } from '../entities/stop-time.entity';

export interface StoptimesResponse {

    station: string,
    distance: number,
    stoptimes: StopTime[]

}
