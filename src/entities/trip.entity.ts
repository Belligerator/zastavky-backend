import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { StopTime } from './stop-time.entity';
import { Calendar } from './calendar.entity';
import { Route } from './route.entity';

@Entity({ name: 'trips' })
export class Trip {

    @Index()
    @Column({ nullable: true })
    public route_id: string;

    @Index()
    @Column({ nullable: true })
    public service_id: string;

    @Index()
    @PrimaryColumn()
    public trip_id: string;

    @Column({ nullable: true })
    public trip_headsign: string;

    @Column({ nullable: true })
    public trip_short_name: string;

    @Column('tinyint', { nullable: true })
    public direction_id: number;

    @Column({ nullable: true})
    public block_id: string;

    @Column({ nullable: true })
    public shape_id: string;

    @Column('tinyint', { nullable: true })
    public wheelchair_accessible: boolean;

    @Column('tinyint', { nullable: true })
    public bikes_allowed: boolean;

    @Column('tinyint', { nullable: true })
    public exceptional: boolean;

    // Relations

    @OneToMany(() => StopTime, a => a.trip)
    public stopTimes?: Array<StopTime>;

    @ManyToOne(() => Calendar, a => a.trips, { eager: true })
    @JoinColumn({ name: 'service_id' })
    public service: Calendar;

    @ManyToOne(() => Route, a => a.trips, { eager: true })
    @JoinColumn({ name: 'route_id' })
    public route: Route;

}
