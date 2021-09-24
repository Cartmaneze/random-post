import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { instance, mock, reset } from 'ts-mockito';
import { WelcomeRepositrotyType } from '../../src/core/components/welcome/port/WelcomeRepository';
import { WelcomeModule } from '../../src/core/components/welcome/WelcomeModule';
import { WelcomeController } from '../../src/primaryAdapters/rest/welcome/WelcomeController';
import { WelcomeEntity } from '../../src/secondaryAdapters/postgres/welcome/data/WelcomeEntity';
import { WelcomeRepositoryAdapter } from '../../src/secondaryAdapters/postgres/welcome/repository/WelcomeRepositoryAdapter';

export const mocks = {
    welcome: {
        welcomeRepository: mock(WelcomeRepositoryAdapter),
    },
};

export async function initTestModule() {
    return await Test.createTestingModule({
        imports: [ WelcomeModule ],
        controllers: [ WelcomeController ],
    })
        .overrideProvider(getRepositoryToken(WelcomeEntity))
        .useValue({ })

        .overrideProvider(WelcomeRepositrotyType)
        .useValue(instance(mocks.welcome.welcomeRepository))

        .compile();
}

export function resetMocks() {
    reset(mocks.welcome.welcomeRepository);
}
