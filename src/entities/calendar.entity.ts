import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'calendar' })
export class Calendar {

    @PrimaryColumn()
    public service_id: string;

    @Column('tinyint', { nullable: true })
    public monday: boolean;

    @Column('tinyint', { nullable: true })
    public tuesday: boolean;

    @Column('tinyint', { nullable: true })
    public wednesday: boolean;

    @Column('tinyint', { nullable: true })
    public thursday: boolean;

    @Column('tinyint', { nullable: true })
    public friday: boolean;

    @Column('tinyint', { nullable: true })
    public saturday: boolean;

    @Column('tinyint', { nullable: true })
    public sunday: boolean;

    @Column('char', { nullable: true, length: 8 })
    public start_date: string;

    @Column('char', { nullable: true, length: 8 })
    public end_date: string;

    @OneToMany(() => Trip, a => a.service)
    public trips?: Array<Trip>;
}
