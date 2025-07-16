import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import {importPKCS8} from 'jose';
import {Request, Response} from "express";
import {PreAnaliseOutputPort} from '../../ports/output/PreAnaliseOutputPort';

dotenv.config();

export class BradescoPreAnaliseAdapter implements PreAnaliseOutputPort {
    private clientId = process.env.BRADESCO_CLIENT_ID;
    private apí = '/v2/pre-analise/validar';
    private apiUrl = process.env.BRADESCO_API_URL + this.apí;
    private privateKey = __dirname + '/../../keys/' + process.env.BRADESCO_PRIVATE_KEY;
    private header = {alg: "RS256", typ: "JWT"};
    // private payload: JWTPayload = {
    //     aud: this.tokenUrl,
    //     sub: this.clientId,
    //     ver: "1.1"
    // };

    async action(req: Request, res: Response): Promise<any> {
        const token = req.header('authorization')?.toString().replace('Bearer ', '');
        const body = req.body;
        const date = new Date;
        const payload = `POST
${this.apí}
\n
${JSON.stringify(body)}
${token}
${date.getMilliseconds()}
${date.getTime()}
SHA256`;

        const jwt = this.jwt(payload);

        const headers = {
            'Authorization': 'Bearer ' + token,
            'X-Brad-Nonce': date.getMilliseconds(),
            'X-Brad-Signature': jwt,
            'X-Brad-Timestamp': date.getTime(),
            'X-Brad-Algorithm': 'SHA256',
            'access-token': this.clientId,
        };

        try {

            /* Para testes */
            return this.mock()

            /* Original */
            // const response = await axios.post(this.apiUrl, body, {headers});
            // return response.data;
        } catch (error: any) {
            console.error('Erro na autenticação com Bradesco:', error.response?.data || error.message);
            throw new Error('Erro ao acessar a api.');
        }
    }

    jwt(payload: string): string {
        const chavePrivadaPem = fs.readFileSync(path.resolve(this.privateKey), 'utf8');

        return jwt.sign(payload, chavePrivadaPem, {
            algorithm: 'RS256', // Ou outro, conforme exigido pela API
            header: this.header
        });
    }

    mock() {
        return [
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            },
            {
                "codigoResultadoAnalise": "",
                "dataAnoSolicitacao": "",
                "descricaoMotivoRecusa": "",
                "numeroPropostaRccp": "",
                "valorEntradaSugerida": ""
            }
        ];
    }
}
