import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServerRestartsTable1638368794830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "server_restarts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "version",
                    type: "varchar",
                },
                {
                    name: "timestamp",
                    type: "timestamp",
                    default: 'now()'
                }
            ]
        }), true);
        console.log('Table created');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("server_restarts");
    }

}
