import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'routes' })
export class Route {

    @PrimaryColumn('varchar', { length: 20 })
    public route_id: string;

    @Column({ nullable: true })
    public agency_id: number;

    @Column('varchar', { nullable: true, length: 255 })
    public route_short_name: string;

    @Column('varchar', { nullable: true, length: 255 })
    public route_long_name: string;

    @Column({ nullable: true })
    public route_type: number;

    @Column('varchar', { nullable: true, length: 10 })
    public route_color: string;

    @Column('varchar', { nullable: true, length: 10 })
    public route_text_color: string;

    @Column('varchar', { nullable: true, length: 255 })
    public route_url: string;

    @Column({ nullable: true })
    public is_night: boolean;

    @Column({ nullable: true })
    public is_regional: boolean;

    @Column({ nullable: true })
    public is_substitute_transport: boolean;

    @OneToMany(() => Trip, a => a.route)
    public trips?: Array<Trip>;
}
