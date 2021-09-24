import { join } from 'path';
import { Welcome } from '../../../../src/core/components/welcome/domain/data/Welcome';
import { WelcomeRepository } from '../../../../src/core/components/welcome/port/WelcomeRepository';
import { WelcomeEntityConverter } from '../../../../src/secondaryAdapters/postgres/welcome/converters/WelcomeEntityConverter';
import { WelcomeEntity } from '../../../../src/secondaryAdapters/postgres/welcome/data/WelcomeEntity';
import { WelcomeRepositoryAdapter } from '../../../../src/secondaryAdapters/postgres/welcome/repository/WelcomeRepositoryAdapter';
import { setupSchema, shutdownConnection } from '../../common/base';
import { dropTables, loadData } from '../common/DataManager';

describe('welcome repository testing', () => {
    let welcomeRepository: WelcomeRepository;

    const testDataSources = [
        {
            filename: join(__dirname, 'fixtures', 'welcome.sql'),
            tablename: 'welcome',
        },
    ];

    beforeAll(async () => {
        const connection = await setupSchema();
        welcomeRepository = new WelcomeRepositoryAdapter(
            connection.getRepository(WelcomeEntity),
            new WelcomeEntityConverter(),
        );
    });

    afterAll(async () => {
        await shutdownConnection();
    });

    beforeEach(async () => {
        await loadData(...testDataSources);
    });

    afterEach(async () => {
        await dropTables(...testDataSources.slice().reverse());
    });

    it('should return message', async () => {
        const testId = 2;
        const messageCortege = await welcomeRepository.findById(testId);
        expect(messageCortege).toBeInstanceOf(Welcome);
        expect(messageCortege).toStrictEqual(Welcome.fromObject({
            id: 2,
            message: 'Hello! It is for an integration testing!',
        }));
    });
});
