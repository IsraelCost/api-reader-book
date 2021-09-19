import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateReaderTable1632073265826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'readers',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isPrimary: false,
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isPrimary: false,
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isPrimary: false,
                    isNullable: false
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('readers');

    }

}
