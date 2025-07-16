# Lambda Bradesco PreAnalise

Este projeto implementa a autenticação com a API PreAnalise do Bradesco usando **TypeScript** com a **Arquitetura
Hexagonal (Ports & Adapters)**.

---

## 📌 Visão Geral

- Obtemos um token OAuth2 (grant\_type client\_credentials) da API do Bradesco.
- A arquitetura hexagonal isola regras de negócio (UseCases) das dependências externas (HTTP, Bradesco).

---

## 📁 Estrutura

```
├── src
│   ├── application
│   │   └── use-cases
│   │       └── PreAnaliseUseCase.ts         # Caso de uso de autenticação
│   ├── infrastructure
│   │   └── adapters
│   │       └── BradescoPreAnaliseAdapter.ts  # Implementação da porta de saída
│   ├── interfaces
│   │   ├── controllers
│   │   │   └── PreAnaliseController.ts       # Controller HTTP
│   │   └── routes
│   │       └── index.ts                # Rotas Express
│   ├── keys
│   │   └── privata_key.pem             # Chave Privada
│   │   └── public_key.pem              # Chave Pública
│   ├── ports
│   │   └── output
│   │       └── PreAnaliseOutputPort.ts      # Porta de saída da regra de negócio
│   └── index.ts                        # App principal
```

---

## 🔄 Fluxo da Arquitetura

```
A [Request HTTP] --> B[PreAnaliseController]
B --> C[PreAnaliseUseCase]
C --> D[BradescoPreAnaliseAdapter]
D --> E[Bradesco PreAnalise API]
E --> |jsonResponse|
```

---

## ▶️ Como Rodar

1. Clone o projeto

```bash
git clone git@github.com:janilsonecosys/lambda_bradesco_pre_analise.git
```

2. Instale as dependências

```bash
npm install
```

3. Configure variáveis de ambiente em `.env`

```env
BRADESCO_API_URL=endereco_api_bradesco
BRADESCO_CLIENT_ID=seu_client_id
BRADESCO_PRIVATE_KEY=nome_arquivo_chave_privada
```

4. Gerar as chaves **pública e privada** para testes ou colocar na pasta **keys**

```bash
cd keys
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

5. Ou renomeie na pasta **keys** os arquivos

```bash
mkdir keys
cp private_key.pem_example private_key
cp public_key.pem_example public_key
```

6. Inicie o servidor

```bash
npm run dev
```

7. Teste a rota

```bash
curl http://localhost:3000/api
```

---

## ✅ Requisitos

- Node.js 18+
- Cliente Bradesco com OAuth2 habilitado

---

## 🧱 Tecnologias

- TypeScript
- Express
- Axios
- dotenv
- JOSE
- JWT
- Arquitetura Hexagonal

---

## ✍️ Autor

Feito por p — [contato@exemplo.com](mailto\:contato@exemplo.com)
