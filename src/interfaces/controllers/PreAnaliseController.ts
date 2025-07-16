import {Request, Response} from 'express';
import {PreAnaliseUseCase} from '../../application/use-cases/PreAnaliseUseCase';

export class PreAnaliseController {
    constructor(private readonly PreAnaliseUseCase: PreAnaliseUseCase) {
    }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.PreAnaliseUseCase.execute(req, res);
            res.json(result);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}
