import * as fs from 'fs';
import { getConnection, QueryRunner } from 'typeorm';

export interface DataSource {
    tablename: string;
    filename: string;
}

export async function loadData(...dataSources: DataSource[]): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    await Promise.all(dataSources.map(dataSource => executeSqlFile(queryRunner, dataSource.filename)));
    await  queryRunner.commitTransaction();
    await queryRunner.release();
}

export async function dropTables(...dataSources: DataSource[]): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    await Promise.all(dataSources.map(dataSource => queryRunner.query(`DELETE FROM ${dataSource.tablename}`)));

    await queryRunner.commitTransaction();
    await queryRunner.release();
}

async function executeSqlFile(queryRunner: QueryRunner, filename: string): Promise<void> {
    const sql = fs.readFileSync(filename).toString();
    await queryRunner.query(sql);
}
