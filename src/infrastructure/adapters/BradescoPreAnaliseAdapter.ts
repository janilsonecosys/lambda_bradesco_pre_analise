import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import {Request, Response} from "express";
import {PreAnaliseOutputPort} from '../../ports/output/PreAnaliseOutputPort';
import {createPrivateKey, createSign} from "node:crypto";

dotenv.config();

export class BradescoPreAnaliseAdapter implements PreAnaliseOutputPort {
    private clientId = process.env.BRADESCO_CLIENT_ID;
    private api = '/v2/pre-analise/validar';
    private apiUrl = process.env.BRADESCO_API_URL + this.api;
    private privateKey = __dirname + '/../../keys/' + process.env.BRADESCO_PRIVATE_KEY;

    async action(req: Request, res: Response): Promise<any> {
        const token = req.header('authorization')?.toString().replace('Bearer ', '');
        const body = req.body;
        const date = new Date();
        const nonce = req.header('jti')?.toString() ?? date.getTime().toString();
        const bodyStr = JSON.stringify(body).replace(/\s+/g, '');
        // const nonce = date.getTime().toString();
        const timestamp = date.toISOString().split('.')[0] + '-00:00';

        const assinaturaPayload = [
            'POST',
            this.api,
            '',
            bodyStr,
            token,
            nonce,
            timestamp,
            'SHA256'
        ].join('\n');

        const assinatura = await this.assinarXBrad(assinaturaPayload);

        // console.log('request.txt: ', assinatura);

        const headers = {
            'Authorization': 'Bearer ' + token,
            'X-Brad-Signature': assinatura,
            'X-Brad-Nonce': nonce,
            'X-Brad-Timestamp': timestamp,
            'X-Brad-Algorithm': 'SHA256',
            'access-token': this.clientId
        };

        try {
            console.log('request.txt: ', assinaturaPayload);
            console.log('Url:', this.apiUrl);
            console.log('Headers:', headers);
            console.log('Body:', body);
            const response = await axios.post(this.apiUrl, body, {headers});
            return response.data;
        } catch (error: any) {
            console.log(error);
            console.error('Erro na autenticação com Bradesco:', error.response?.data || error.message);
            throw new Error('Erro ao acessar a api');
        }
    }

    async carregarChavePrivada(): Promise<any> {
        const pem = fs.readFileSync(this.privateKey!, 'utf8');
        return createPrivateKey({
            key: pem,
            format: 'pem',
            type: 'pkcs1',
        });

    }

    async assinarXBrad(payload: string): Promise<string> {
        const key = await this.carregarChavePrivada();
        const data = new TextEncoder().encode(payload);

        const sign = createSign('RSA-SHA256');
        sign.update(data);
        sign.end();

        return sign.sign(key, 'base64');
    }
}
