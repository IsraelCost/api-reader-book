import {MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBookTable1632085619961 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'books',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'reader_id',
                    type: 'varchar',
                    isNullable: true
                }
            ]
        }));

        await queryRunner.createForeignKey('books', new TableForeignKey({
            columnNames: ['reader_id'],
            referencedTableName: 'readers',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('books');
    }

}
