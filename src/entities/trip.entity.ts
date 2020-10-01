import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { StopTime } from './stop-time.entity';
import { Calendar } from './calendar.entity';
import { Route } from './route.entity';

@Entity({ name: 'trips' })
export class Trip {

    @Index()
    @PrimaryColumn('mediumint', { length: 9 })
    public trip_id: number;

    @Index()
    @Column('varchar', { nullable: true, length: 20 })
    public route_id: string;

    @ManyToOne(() => Route, a => a.trips)
    @JoinColumn({ name: 'route_id' })
    public route: Route;

    @Index()
    @Column('tinyint', { nullable: true })
    public service_id: number;

    @ManyToOne(() => Calendar, a => a.trips)
    @JoinColumn({ name: 'service_id' })
    public service: Calendar;

    @Column('varchar', { nullable: true, length: 255 })
    public trip_headsign: string;

    @Column('smallint', { nullable: true })
    public stop_sequence: number;

    @Column('tinyint', { nullable: true })
    public shape_id: number;

    @Column('varchar', { nullable: true, length: 20 })
    public block_id: string;

    @Column('tinyint', { nullable: true })
    public direction_id: number;

    @Column('tinyint', { nullable: true })
    public bikes_allowed: boolean;

    @Column('tinyint', { nullable: true })
    public exceptional: boolean;

    @OneToMany(() => StopTime, a => a.trip)
    public stopTimes?: Array<StopTime>;

}
