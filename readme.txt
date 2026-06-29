# Sistema de Biblioteca

## Alunos
- João Antonio Carboni Gomes
- Jedson Marangoni
- Diogo Calegari dos Reis
- Giovanni Daniotti Beker de Sousa

## Requisitos
- Node.js v18+
- PostgreSQL 14+
- npm

## Configuração do Banco de Dados
1. Crie um banco de dados PostgreSQL chamado `biblioteca`
2. Copie o arquivo `.env.example` para `.env`
3. Preencha as variáveis no `.env` com suas credenciais

## Instalação e Execução

### Back-end
```bash
cd biblioteca-backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### Front-end
```bash
cd biblioteca-backend/biblioteca-frontend
npm install
npm start
```

## Usuário Administrador padrão
- E-mail: admin@biblioteca.com
- Senha: admin123

## URLs
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- Swagger (documentação da API): http://localhost:3000/api-docs

## Variáveis de Ambiente
Copie `.env.example` para `.env` e preencha:
- `DB_HOST` — host do banco (geralmente localhost)
- `DB_PORT` — porta do PostgreSQL (geralmente 5432)
- `DB_NAME` — nome do banco (biblioteca)
- `DB_USER` — usuário do PostgreSQL
- `DB_PASS` — senha do PostgreSQL
- `JWT_SECRET` — chave secreta para autenticação
- `JWT_EXPIRES_IN` — tempo de expiração do token (ex: 8h)
