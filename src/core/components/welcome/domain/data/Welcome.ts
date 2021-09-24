interface WelcomeBuilder {
    id?: number | undefined | null;
    message: string;
}

export class Welcome {
    id: number | null;
    message: string;

    static fromObject(builder: WelcomeBuilder): Welcome {
        const data = new Welcome();
        data.id = builder.id || null;
        data.message = builder.message;
        return data;
    }
}
