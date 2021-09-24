import { capture, instance, mock, verify, when } from 'ts-mockito';
import { WelcomeResponseMapper } from '../../src/core/components/welcome/application/services/mappers/WelcomeResponseMapper';
import { WelcomeService } from '../../src/core/components/welcome/application/services/WelcomeService';
import { Welcome } from '../../src/core/components/welcome/domain/data/Welcome';
import { WelcomeRepositoryAdapter } from '../../src/secondaryAdapters/postgres/welcome/repository/WelcomeRepositoryAdapter';

describe('Get welcome message', () => {
    const repositoryMock = mock(WelcomeRepositoryAdapter);
    let welcomeService: WelcomeService;
    let responseMapper: WelcomeResponseMapper;

    const testData = {
        id: 1,
        message: 'Welcome test message!',
    };

    beforeAll(() => {
        responseMapper = new WelcomeResponseMapper();
        welcomeService = new WelcomeService(
            instance(repositoryMock),
            responseMapper,
        );
    });

    it('capture passed params to repository', async () => {
        const welcomeCortegeObject = Welcome.fromObject({
            id: testData.id,
            message: testData.message,
        });
        when(repositoryMock.findById(testData.id)).thenResolve(welcomeCortegeObject);
        await welcomeService.getWelcomeMessage(testData.id);
        const [ welcomeCortege ] = capture(repositoryMock.findById).first();
        expect(welcomeCortege).toEqual(testData.id);
    });
});
