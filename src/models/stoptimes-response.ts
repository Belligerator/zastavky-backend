import { StopTime } from '../entities/stop-time.entity';

export interface StoptimesResponse {

    station: string,
    distance: number,
    lat: number,
    lng: number,
    stoptimes: StopTime[]

}
