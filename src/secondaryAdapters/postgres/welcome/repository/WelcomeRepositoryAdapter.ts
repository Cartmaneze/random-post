import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Welcome } from '../../../../core/components/welcome/domain/data/Welcome';
import { WelcomeRepository } from '../../../../core/components/welcome/port/WelcomeRepository';
import { Converter } from '../../../../core/sharedKernel/interfaces/Converter';
import { WelcomeEntityConverterType } from '../converters/WelcomeEntityConverter';
import { WelcomeEntity } from '../data/WelcomeEntity';

@Injectable()
export class WelcomeRepositoryAdapter implements WelcomeRepository {
    constructor(
        @InjectRepository(WelcomeEntity)
        private readonly repository: Repository<WelcomeEntity>,
        @Inject(WelcomeEntityConverterType)
        private readonly converter: Converter<Welcome, WelcomeEntity>,
    ) { }

    public async findById(id: number): Promise<Welcome | null> {
        const entity = await this.repository.findOne({ id });
        return entity ? this.converter.to(entity) : null;
    }

    public async save(data: Welcome): Promise<Welcome> {
        const entity = await this.repository.save(WelcomeEntity.fromObject(data));
        return Welcome.fromObject(entity);
    }
}
