const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Biblioteca',
    version: '1.0.0',
    description: 'Sistema de Gerenciamento de Biblioteca'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login do usuário',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'admin@biblioteca.com' },
                  senha: { type: 'string', example: 'admin123' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login realizado com sucesso' },
          401: { description: 'Credenciais inválidas' }
        }
      }
    },
    '/api/auth/cadastrar': {
      post: {
        tags: ['Auth'],
        summary: 'Cadastrar novo usuário (admin)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string', example: 'João Silva' },
                  email: { type: 'string', example: 'joao@biblioteca.com' },
                  senha: { type: 'string', example: '123456' },
                  tipo: { type: 'string', enum: ['administrador', 'bibliotecario', 'leitor'] }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Usuário criado com sucesso' },
          400: { description: 'E-mail já cadastrado' }
        }
      }
    },
    '/api/usuarios': {
      get: {
        tags: ['Usuários'],
        summary: 'Listar todos os usuários',
        responses: { 200: { description: 'Lista de usuários' } }
      }
    },
    '/api/usuarios/{id}': {
      get: {
        tags: ['Usuários'],
        summary: 'Buscar usuário por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Usuário encontrado' }, 404: { description: 'Não encontrado' } }
      },
      put: {
        tags: ['Usuários'],
        summary: 'Atualizar usuário',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string' },
                  email: { type: 'string' },
                  tipo: { type: 'string', enum: ['administrador', 'bibliotecario', 'leitor'] },
                  status: { type: 'string', enum: ['ativo', 'inativo'] }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Atualizado com sucesso' } }
      },
      delete: {
        tags: ['Usuários'],
        summary: 'Excluir usuário',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Excluído com sucesso' } }
      }
    },
    '/api/livros': {
      get: {
        tags: ['Livros'],
        summary: 'Listar livros com filtros',
        parameters: [
          { name: 'titulo', in: 'query', schema: { type: 'string' } },
          { name: 'autor', in: 'query', schema: { type: 'string' } },
          { name: 'categoria', in: 'query', schema: { type: 'string' } },
          { name: 'isbn', in: 'query', schema: { type: 'string' } },
          { name: 'disponivel', in: 'query', schema: { type: 'boolean' } }
        ],
        responses: { 200: { description: 'Lista de livros' } }
      },
      post: {
        tags: ['Livros'],
        summary: 'Cadastrar livro',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  titulo: { type: 'string', example: 'Clean Code' },
                  autor: { type: 'string', example: 'Robert C. Martin' },
                  editora: { type: 'string', example: 'Prentice Hall' },
                  ano_publicacao: { type: 'integer', example: 2008 },
                  categoria: { type: 'string', example: 'Tecnologia' },
                  isbn: { type: 'string', example: '978-0132350884' },
                  quantidade_total: { type: 'integer', example: 3 }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Livro criado' } }
      }
    },
    '/api/livros/{id}': {
      get: {
        tags: ['Livros'],
        summary: 'Buscar livro por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Livro encontrado' } }
      },
      put: {
        tags: ['Livros'],
        summary: 'Atualizar livro',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  titulo: { type: 'string' },
                  autor: { type: 'string' },
                  editora: { type: 'string' },
                  ano_publicacao: { type: 'integer' },
                  categoria: { type: 'string' },
                  isbn: { type: 'string' },
                  quantidade_total: { type: 'integer' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Atualizado' } }
      },
      delete: {
        tags: ['Livros'],
        summary: 'Excluir livro',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Excluído' } }
      }
    },
    '/api/leitores': {
      get: {
        tags: ['Leitores'],
        summary: 'Listar leitores',
        parameters: [
          { name: 'nome', in: 'query', schema: { type: 'string' } },
          { name: 'cpf_ra', in: 'query', schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Lista de leitores' } }
      },
      post: {
        tags: ['Leitores'],
        summary: 'Cadastrar leitor',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string', example: 'Maria Souza' },
                  cpf_ra: { type: 'string', example: '123.456.789-00' },
                  email: { type: 'string', example: 'maria@email.com' },
                  telefone: { type: 'string', example: '(43) 99999-9999' },
                  endereco: { type: 'string', example: 'Rua das Flores, 123' },
                  usuario_id: { type: 'integer', example: 2 }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Leitor criado' } }
      }
    },
    '/api/leitores/{id}': {
      get: {
        tags: ['Leitores'],
        summary: 'Buscar leitor por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Leitor encontrado' } }
      },
      put: {
        tags: ['Leitores'],
        summary: 'Atualizar leitor',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string' },
                  cpf_ra: { type: 'string' },
                  email: { type: 'string' },
                  telefone: { type: 'string' },
                  endereco: { type: 'string' },
                  status: { type: 'string', enum: ['ativo', 'inativo'] }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Atualizado' } }
      },
      delete: {
        tags: ['Leitores'],
        summary: 'Excluir leitor',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Excluído' } }
      }
    },
    '/api/leitores/{id}/historico': {
      get: {
        tags: ['Leitores'],
        summary: 'Histórico de empréstimos do leitor',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Histórico de empréstimos' } }
      }
    },
    '/api/emprestimos': {
      get: {
        tags: ['Empréstimos'],
        summary: 'Listar empréstimos',
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['em_aberto', 'devolvido', 'atrasado'] } },
          { name: 'leitor_id', in: 'query', schema: { type: 'integer' } },
          { name: 'data_inicio', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'data_fim', in: 'query', schema: { type: 'string', format: 'date' } }
        ],
        responses: { 200: { description: 'Lista de empréstimos' } }
      },
      post: {
        tags: ['Empréstimos'],
        summary: 'Registrar empréstimo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  leitor_id: { type: 'integer', example: 1 },
                  livro_id: { type: 'integer', example: 1 },
                  data_emprestimo: { type: 'string', format: 'date', example: '2026-06-23' },
                  data_prevista_devolucao: { type: 'string', format: 'date', example: '2026-07-07' }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Empréstimo registrado' } }
      }
    },
    '/api/emprestimos/atrasados': {
      get: {
        tags: ['Empréstimos'],
        summary: 'Listar empréstimos atrasados',
        responses: { 200: { description: 'Lista de atrasados' } }
      }
    },
    '/api/emprestimos/{id}': {
      get: {
        tags: ['Empréstimos'],
        summary: 'Buscar empréstimo por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Empréstimo encontrado' } }
      }
    },
    '/api/emprestimos/{id}/devolver': {
      patch: {
        tags: ['Empréstimos'],
        summary: 'Registrar devolução',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data_real_devolucao: { type: 'string', format: 'date', example: '2026-06-23' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Devolução registrada' } }
      }
    }
  }
};

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};