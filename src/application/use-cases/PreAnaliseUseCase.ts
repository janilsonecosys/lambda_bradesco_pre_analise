import {Request, Response} from 'express';
import {PreAnaliseOutputPort} from '../../ports/output/PreAnaliseOutputPort';

export class PreAnaliseUseCase {
    constructor(private readonly PreAnaliseProvider: PreAnaliseOutputPort) {
    }

    async execute(req: Request, res: Response): Promise<any> {
        return this.PreAnaliseProvider.action(req, res);
    }
}
