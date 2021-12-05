import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1638674342246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'varchar(36)', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'full_name', type: 'varchar(64)', isNullable: false },
                { name: 'cpf', type: 'varchar(11)', isUnique: true, isNullable: false },
                { name: 'role', type: 'varchar(8)', isNullable: false },
                { name: 'password', type: 'varchar', isNullable: false },
                { name: 'is_active', type: 'boolean', default: true, isNullable: false },
                { name: 'deactivation_reason', type: 'varchar', isNullable: true }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
