import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Mapper } from '../../../../sharedKernel/interfaces/Mapper';
import { Welcome } from '../../domain/data/Welcome';
import { WelcomeRepository, WelcomeRepositrotyType } from '../../port/WelcomeRepository';
import { WelcomeResponse } from '../data/output/WelcomeResponse';
import { WelcomeResponseMapperType } from './mappers/WelcomeResponseMapper';

@Injectable()
export class WelcomeService {
    constructor(
        @Inject(WelcomeRepositrotyType)
        private readonly repository: WelcomeRepository,
        @Inject(WelcomeResponseMapperType)
        private readonly responseMapper: Mapper<Welcome, WelcomeResponse>,
    ) { }

    public async getWelcomeMessage(id: number) {
        const message = await this.repository.findById(id);
        if (!message) throw new NotFoundException(`There is not any message by id = ${id}`);
        return this.responseMapper.map(message);
    }

    @Transactional()
    public async saveMessage(message: string): Promise<void> {
        await this.repository.save(Welcome.fromObject({ message }));
    }
}
