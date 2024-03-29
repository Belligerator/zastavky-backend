import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'stops' })
export class Stop {

    @Index()
    @PrimaryColumn()
    public stop_id: string;

    @Index()
    @Column()
    public stop_name: string;

    @Column({type: 'decimal', precision: 7, scale: 5})
    public stop_lat: number;

    @Column({type: 'decimal', precision: 7, scale: 5})
    public stop_lon: number;

    @Column({ nullable: true })
    public zone_id: string;

    @Column({ nullable: true })
    public stop_url: string;

    @Column({ nullable: true })
    public location_type: number;

    @Column({ nullable: true })
    public parent_station: string;

    @Column({ nullable: true })
    public wheelchair_boarding: number;

    @Column({ nullable: true })
    public level_id: string;

    @Column({ nullable: true })
    public platform_code: string;

    public distance_in_meters?: number;
}
