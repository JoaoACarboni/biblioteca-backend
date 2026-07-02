# Sistema de Gerenciamento de Biblioteca

## Integrantes
- João Antonio Carboni Gomes
- Jedson Marangoni
- Diogo Calegari dos Reis
- Giovanni Daniotti Beker de Sousa

## Tema do Projeto
Sistema web para gerenciamento de biblioteca, permitindo o controle de livros,
leitores, empréstimos e usuários, com autenticação e controle de acesso por perfil.

## Tecnologias Utilizadas
### Back-end
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT (autenticação)
- bcryptjs (criptografia de senhas)
- Swagger (documentação da API)
- dotenv

### Front-end
- React.js
- React Router DOM
- Axios

> Todas as tecnologias utilizadas foram abordadas em aula.

## Requisitos
- Node.js v18+
- PostgreSQL 14+
- npm

## Configuração do Banco de Dados
1. Instale e inicie o PostgreSQL
2. Crie um banco de dados chamado `biblioteca`
3. Copie o arquivo `.env.example` e renomeie para `.env`
4. Preencha as variáveis no `.env` com suas credenciais

Exemplo de `.env`:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca
DB_USER=postgres
DB_PASS=sua_senha
JWT_SECRET=qualquer_string_secreta
JWT_EXPIRES_IN=8h

## Instalação e Execução

### Back-end
```bash
cd biblioteca-backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### Front-end (em outro terminal)
```bash
cd biblioteca-backend/biblioteca-frontend
npm install
npm start
```

## Credenciais de Acesso
- **E-mail:** admin@biblioteca.com
- **Senha:** admin123

## URLs
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- Documentação da API (Swagger): http://localhost:3000/api-docs

## Vídeo de Apresentação
https://drive.google.com/file/d/1DOIQ0dKYnEFm9bF2aHMDjGiiCrECQcpQ/view?usp=sharing