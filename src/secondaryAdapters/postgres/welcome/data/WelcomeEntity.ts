import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SQLBigIntToNumberValueTransformer } from '../../../../core/sharedKernel/SQLBigIntToNumberValueTransformer';
import { wrapNullable } from '../../../../core/sharedKernel/wrapNullable';

interface WelcomeEntityBuilder {
    id: number | undefined | null;
    message: string;
}

@Entity({ name: 'welcome' })
export class WelcomeEntity {
    @PrimaryColumn({
        name: 'id',
        generated: true,
        transformer: new SQLBigIntToNumberValueTransformer(),
    })
    id!: number;

    @Column({ name: 'message' })
    message: string;

    static fromObject(builder: WelcomeEntityBuilder): WelcomeEntity {
        const data = new WelcomeEntity();
        data.id = wrapNullable(builder.id);
        data.message = builder.message;
        return data;
    }
}
