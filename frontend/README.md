# 💬 Feedback Front-end

A front-end web application built with **Vue 2 + TypeScript + TailwindCSS**. This interface allows user authentication, listing of collaborators with search and pagination, and submitting feedback to each collaborator.

---

## 🧰 Technologies Used

- [Vue 2](https://v2.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)
- [Vue Composition API](https://github.com/vuejs/composition-api)

---

## ⚙️ Requirements

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Vue CLI](https://cli.vuejs.org/) (optional but recommended)

---

## 📦 Installation

Clone the repository and navigate into the front-end folder:

```bash
git clone https://github.com/your-username/your-repo.git
cd frontend
```

Install the dependencies:

```bash

npm install
# or
yarn install
```

🖌️ Configuração do TailwindCSS
A estilização está baseada no Tailwind CSS 4 com PostCSS.

Arquivo de estilo principal:

```bash
src/assets/tailwind.css
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Arquivo de configuração do PostCSS:

```js
// postcss.config.js
module.exports = {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Arquivo de configuração do Tailwind:

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{vue,ts,js}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

🚀 Executando o projeto
Inicie o servidor de desenvolvimento com:

```bash

npm run serve
# ou
yarn serve
```

A aplicação estará disponível em:

```arduino

http://localhost:8080
```

🔐 Funcionalidades
✅ Tela de login integrada ao back-end via API
✅ Listagem de colaboradores com paginação e busca
✅ Feedback visual para carregamento e estados vazios
✅ Ações com feedback para cada colaborador
✅ Estilização moderna com Tailwind

📁 Estrutura de pastas

```bash

src/
├── assets/
│   └── tailwind.css        # Estilos base do Tailwind
├── components/             # Componentes reutilizáveis
├── views/                  # Páginas (Login, Colaboradores, etc)
├── router/                 # Rotas da aplicação
├── main.ts                 # Ponto de entrada principal
```

📡 Integração com API
A aplicação consome os dados da API do back-end hospedada localmente (ou em outro host definido):

```ts
// Exemplo de chamada
axios.get("http://localhost:3000/collaborators");
```

Você pode configurar variáveis de ambiente no futuro para tornar a URL dinâmica.

🧪 Lint
Para verificar a qualidade do código:

```bash

npm run lint
```

👨‍💻 Autor
João Ferreira Neto
linkedin.com/in/joaoferreiraneto
