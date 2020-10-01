import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity({ name: 'routes' })
export class Route {

    @PrimaryColumn('varchar', { length: 20 })
    public route_id: string;

    @Column('tinyint', { nullable: true })
    public agency_id: number;

    @Column('varchar', { nullable: true, length: 255 })
    public route_short_name: string;

    @Column('varchar', { nullable: true, length: 255 })
    public route_long_name: string;

    @Column('smallint', { nullable: true })
    public wednesday: number;

    @Column('varchar', { nullable: true, length: 10 })
    public route_color: string;

    @Column('varchar', { nullable: true, length: 10 })
    public route_text_color: string;

    @Column('varchar', { nullable: true, length: 255 })
    public route_url: string;

    @OneToMany(() => Trip, a => a.route)
    public trips?: Array<Trip>;
}
