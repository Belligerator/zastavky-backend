import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'stop_times' })
export class StopTime {
    @Index()
    @Column()
    public trip_id: string;

    @Column('time', { nullable: true })
    public arrival_time: string;

    @Index()
    @Column('time', { nullable: true })
    public departure_time: string;

    @Index()
    @Column({ nullable: true })
    public stop_id: string;

    @Column({ nullable: true })
    public stop_sequence: number;

    @Column({ nullable: true })
    public stop_headsign: string;

    @Column({ nullable: true })
    public pickup_type: number;

    @Column({ nullable: true })
    public drop_off_type: number;

    @Column('float', { nullable: true })
    public shape_dist_traveled: number;

    @Column({ nullable: true })
    public trip_operation_type: number;

    @Column({ nullable: true })
    public bikes_allowed: boolean;

    @PrimaryGeneratedColumn()
    public id: number;

    // Relations

    @ManyToOne(() => Trip, a => a.stopTimes)
    @JoinColumn({ name: 'trip_id' })
    public trip: Trip;
}
