import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'stop_times' })
export class StopTime {

    @PrimaryGeneratedColumn()
    public id: number;

    @Index()
    @Column()
    public trip_id: string;

    @ManyToOne(() => Trip, a => a.stopTimes)
    @JoinColumn({ name: 'trip_id' })
    public trip: Trip;

    @Column('time', { nullable: true })
    public arrival_time: string;

    @Index()
    @Column('time', { nullable: true })
    public departure_time: string;

    @Index()
    @Column('varchar', { nullable: true, length: 20 })
    public stop_id: string;

    @Column('smallint', { nullable: true })
    public stop_sequence: number;

    @Column('tinyint', { nullable: true })
    public pickup_type: number;

    @Column('tinyint', { nullable: true })
    public drop_off_type: number;
    @Column({ nullable: true })
    public stop_headsign: string;

    @Column({ nullable: true })
    public shape_dist_traveled: number;

    @Column({ nullable: true })
    public trip_operation_type: number;

    @Column({ nullable: true })
    public bikes_allowed: boolean;

}
