# Projeto Ponto Track

Este projeto é uma API de rastreamento de ponto utilizando várias tecnologias modernas. Ele permite gerenciar usuários, clientes, veículos e rastreamentos, com autenticação baseada em JWT e criptografia de senhas.

## Tecnologias Usadas

- **Node.js**: Plataforma de desenvolvimento para servidor.
- **Express**: Framework web para Node.js.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Prisma**: ORM moderno para Node.js e TypeScript.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT (Json Web Token)**: Método de autenticação para sessões de usuário.
- **Bcrypt**: Biblioteca para hash de senhas.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js e npm instalados.

### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/ponto-track.git
   cd ponto-track
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o banco de dados**:

   - Crie um banco de dados MySQL, utilizando as configurações docker.
   - Configure o arquivo `.env`:
     ```env
     DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
     JWT_SECRET="sua_chave_secreta"
     ```

4. **Execute as migrações do Prisma**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Inicie o servidor**:
   ```bash
   npm run start
   ```

## Pontos Abordados

### Tecnologias e Estrutura

- **Node.js com Express**: Utilizado para criar a API REST.
- **TypeScript**: Garantiu uma melhor manutenção e detecção de erros durante o desenvolvimento.
- **Prisma ORM**: Facilitou a interação com o banco de dados, incluindo migrações e relações complexas.
- **JWT para Autenticação**: Implementação de autenticação segura e eficiente.
- **Bcrypt para Criptografia de Senhas**: Garantiu a segurança das senhas dos usuários.

### Funcionalidades Implementadas

1. **Autenticação de Usuários**:

   - Criação de usuários com senha criptografada.
   - Login com geração de token JWT.

2. **Gerenciamento de Recursos**:

   - CRUD completo para usuários, clientes, veículos e rastreamentos.
   - Inclusão de relações complexas entre clientes, veículos e rastreamentos.
   - Exclusão em cascata de registros relacionados.

3. **Segurança**:
   - Hash de senhas com Bcrypt.

## Melhorias no Fluxo Atual

- **Validação de Dados**: Adicionar validações mais robustas nas entradas de dados, utilizando bibliotecas como `Joi` ou `Zod`.
- **Implementação Autenticação**: Adicionar validação de autenticação de requisições através do Token JWT.
- **Tratamento de Erros**: Melhorar a gestão de erros com middleware de tratamento de erros centralizado.
- **Testes Automatizados**: Implementar testes unitários e de integração utilizando Jest ou Mocha.

## Novas Features

- **Funcionalidade de Logs**: Adicionar logs detalhados para monitorar e depurar a aplicação.
- **Notificações**: Implementar notificações por e-mail para ações importantes (ex.: criação de contas, reset de senha).

## Conclusão

Este projeto é uma base sólida para uma aplicação de rastreamento de veiculos, utilizando tecnologias modernas e boas práticas de desenvolvimento. As melhorias e novas features sugeridas podem aumentar significativamente a robustez e a funcionalidade da aplicação.
