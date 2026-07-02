<<<<<<< HEAD
# Sistema de Gerenciamento de Biblioteca

## Integrantes
=======
# Sistema de Biblioteca

## Alunos
>>>>>>> 23fcc6c9f4d36e58a02de636aaf45f9abd89080c
- João Antonio Carboni Gomes
- Jedson Marangoni
- Diogo Calegari dos Reis
- Giovanni Daniotti Beker de Sousa

<<<<<<< HEAD
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

=======
>>>>>>> 23fcc6c9f4d36e58a02de636aaf45f9abd89080c
## Requisitos
- Node.js v18+
- PostgreSQL 14+
- npm

## Configuração do Banco de Dados
<<<<<<< HEAD
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
=======
1. Crie um banco de dados PostgreSQL chamado `biblioteca`
2. Copie o arquivo `.env.example` para `.env`
3. Preencha as variáveis no `.env` com suas credenciais
>>>>>>> 23fcc6c9f4d36e58a02de636aaf45f9abd89080c

## Instalação e Execução

### Back-end
```bash
cd biblioteca-backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

<<<<<<< HEAD
### Front-end (em outro terminal)
=======
### Front-end
>>>>>>> 23fcc6c9f4d36e58a02de636aaf45f9abd89080c
```bash
cd biblioteca-backend/biblioteca-frontend
npm install
npm start
```

<<<<<<< HEAD
## Credenciais de Acesso
- **E-mail:** admin@biblioteca.com
- **Senha:** admin123
=======
## Usuário Administrador padrão
- E-mail: admin@biblioteca.com
- Senha: admin123
>>>>>>> 23fcc6c9f4d36e58a02de636aaf45f9abd89080c

## URLs
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
<<<<<<< HEAD
- Documentação da API (Swagger): http://localhost:3000/api-docs

## Vídeo de Apresentação
=======
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
>>>>>>> 23fcc6c9f4d36e58a02de636aaf45f9abd89080c
