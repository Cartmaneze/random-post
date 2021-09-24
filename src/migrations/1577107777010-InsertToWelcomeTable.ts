import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertToWelcomeTable1577107777010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const insertRowToWelcomeTable = `
            INSERT INTO welcome (message) VALUES ('Hello! It is nest-js-project-template-hexagonal!');
        `;

        await queryRunner.query(insertRowToWelcomeTable);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
