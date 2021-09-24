import { MigrationInterface, QueryRunner } from 'typeorm';

export class WelcomeTable1577105608805 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const createWelcomeTableSQL = `
        CREATE TABLE IF NOT EXISTS welcome (
            id BIGSERIAL PRIMARY KEY,
            message text
          );`;

        await queryRunner.query(createWelcomeTableSQL);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> { }

}
