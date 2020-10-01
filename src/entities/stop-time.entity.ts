import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'stop_times' })
export class StopTime {

    @PrimaryGeneratedColumn()
    public id: number;

    @Index()
    @Column('mediumint')
    public trip_id: number;

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

}
