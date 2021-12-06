import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'server_restarts' })
export class ServerRestarts {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public version: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    public timestamp?: Date;

}
