# Desafio Técnico Full Stack — Sistema de Feedback Interno

## 🎯 Objetivo

Desenvolver uma aplicação web completa para gestão de feedbacks internos entre colaboradores de uma empresa. O sistema permitirá que funcionários deixem feedbacks (públicos ou privados) para colegas, podendo visualizar os feedbacks recebidos e enviados.

## 🧱 Stack Tecnológica Obrigatória

### Front-end

- Vue 2 ou 3
- TypeScript

### Back-end

- Node.js
- TypeScript
- NestJS como framework principal
- Banco de dados: PostgreSQL
- ORM - Sequelize

## ✨ Funcionalidades Requeridas

### 1. Autenticação (simples)

- Login apenas com nome de usuário (username) (sem senha, para simplificação)
- O login deve persistir em sessão/local storage
- Simule a autenticação no back-end com dados mockados

### 2. Listagem de Colaboradores

- Visualizar todos os colaboradores cadastrados
- Filtro de busca por nome

### 3. Envio de Feedback

- Selecionar um colaborador e enviar um feedback com:
  - Título
  - Descrição
  - Tipo: Público ou Privado
- O feedback deve ser persistido no back-end

### 4. Visualização de Feedbacks

- Cada usuário pode visualizar:
  - Feedbacks enviados por ele
  - Feedbacks recebidos, com distinção entre públicos e privados (somente o destinatário pode ver os privados)

## 📦 Extras Opcionais (para avaliação de proatividade)

- O layout não precisa seguir o exemplo do video coloque sua criatividade em um layout moderno
- Criação de novos colaboradores
- Edição e exclusão de feedbacks
- Testes automatizados (unitários ou e2e)

## 📋 Critérios de Avaliação

| Critério                              | Descrição                                                            |
| ------------------------------------- | -------------------------------------------------------------------- |
| Arquitetura de código                 | Organização modular, divisão clara entre camadas e responsabilidades |
| Código limpo e legível                | Convenções, legibilidade, clareza nos nomes e estrutura              |
| Boas práticas com TypeScript          | Tipagens corretas, uso adequado de interfaces e tipos genéricos      |
| Identificação e resolução de gargalos | Solução ou documentação dos problemas de performance propostos       |
| Estrutura de dados e banco            | Modelagem adequada, uso eficiente de queries                         |
| UX e fluidez                          | Comportamento fluido da interface, sem travamentos ou falhas         |
| Proatividade                          | Adição de recursos extras ou melhorias não solicitadas               |
| Documentação                          | README claro, instruções de execução, decisões técnicas justificadas |

## 📤 Instruções de Entrega

- Crie um repositório privado no GitHub
- Inclua instruções de execução local (com npm ou yarn)
- Compartilhe o acesso ao repositório com o avaliador
- Prazo de entrega: 7 dias corridos

## 🚀 Iniciando o Projeto

### Estrutura do Projeto

```
/
├── backend/         # Código do servidor NestJS
├── frontend/        # Aplicação Vue.js
└── README.md        # Este arquivo
```

## 💡 Dicas

- Preste atenção
- Utilize TypeScript de forma eficiente, criando interfaces e tipos reutilizáveis
- Considere a experiência do usuário ao desenvolver a interface
- Documente suas decisões técnicas e arquiteturais
- Aproveite os recursos do NestJS como injeção de dependência, módulos e decorators para criar uma arquitetura robusta
