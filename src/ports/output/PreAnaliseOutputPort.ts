import {Request, Response} from 'express';

export interface PreAnaliseOutputPort {
    action(req: Request, res: Response): Promise<any>;
}
