import { Welcome } from '../domain/data/Welcome';

export interface WelcomeRepository {
    findById(id: number): Promise<Welcome | null>;
    save(data: Welcome): Promise<Welcome>;
}

const WelcomeRepositrotyType = Symbol.for('WelcomeRepository');
export { WelcomeRepositrotyType };
