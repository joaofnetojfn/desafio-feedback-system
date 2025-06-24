# 📋 Projeto Feedback System - Backend

Este projeto é o backend de um sistema de feedback, desenvolvido com NestJS, Sequelize (ORM) e PostgreSQL (via Docker).

---

## ✅ Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm ou yarn
- TypeScript (já incluso ao instalar as dependências)
- (Opcional) `ts-node` para rodar scripts TypeScript diretamente

---

## 🚀 Passo a passo para rodar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_PROJETO>
```

2. Configure o banco de dados com Docker
   No terminal/bash:

```
bash

docker run --name postgres_feedback -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=feedback_system -p 5432:5432 -d postgres
```

Verifique se o container está rodando:

```
bash

docker ps
```

O container deve aparecer na lista.

3. Configurar variáveis de ambiente
   Na raiz do backend (exemplo: src/backend/), crie um arquivo chamado .env com o seguinte conteúdo:

```
ini


DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=feedback_system
```

Isso garante que a aplicação se conecte ao banco de dados corretamente.

4. Instale as dependências
   Dentro da pasta do backend:

```
bash

npm install
```

Ou, se preferir:

```
bash

yarn install
```

5. Executar as migrations (se aplicável)
   Se o projeto estiver configurado para usar migrations, rode:

```
bash
Editar
npm run migration:run
```

Observação:
Se você ainda não configurou os scripts de migration no package.json, adicione algo como:

```
json

"scripts": {
  "migration:run": "sequelize-cli db:migrate"
}
```

(Ajuste conforme a sua ferramenta de migrations)

6. Rodar o Seed (inserir dados iniciais)
   Para popular o banco com dados de exemplo:

```
bash
npm run seed
```

Exemplo de configuração no package.json:

```
json

"scripts": {
  "seed": "ts-node ./src/backend/config/seed.ts"
}
```

Certifique-se de que o arquivo seed.ts está no local correto.

7. Rodar o backend em modo desenvolvimento

```
bash

npm run start:dev
```

Isso vai subir o NestJS na porta padrão 3000.

8. Testar a API no navegador ou em ferramentas como Postman/Insomnia
   Acesse:

```
bash

http://localhost:3000/collaborators
```

Se o banco e tudo estiver funcionando:

- Se tiver dados: Retorna uma lista de colaboradores em JSON

- Se o banco estiver vazio: Retorna um array vazio []

🛠️ Possíveis Erros Comuns
🔴 Erro: password authentication failed for user "seu_usuario"
✅ Solução:
Verifique se seu .env está correto (usuário, senha e nome do banco).
O correto é algo como:

```
ini
Copiar

DB_USERNAME=postgres
DB_PASSWORD=postgres
```

🔴 Erro: Arquivo seed.ts não encontrado ao rodar o seed
✅ Solução:
Verifique o caminho no package.json. Exemplo:

```
json

"scripts": {
  "seed": "ts-node ./src/backend/seed.ts"
}
```

🔴 Erro: Conexão recusada ao banco de dados
✅ Soluções:

- Confirme se o container do Docker está rodando:

```
bash

docker ps
```

- Verifique se a porta 5432 está livre.
- Teste conexão via psql ou alguma ferramenta como DBeaver.

🧰 Tecnologias usadas

- NestJS
- Sequelize (ORM)
- PostgreSQL (via Docker)
- TypeScript

👨‍💻 Contato
João Ferreira Neto
🔗 LinkedIn https://www.linkedin.com/in/joaoferreiraneto/
