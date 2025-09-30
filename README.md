# AnkaTech - Case Frontend

Frontend do sistema MFO, desenvolvido com **Next.js**, **TypeScript** e **TailwindCSS**.

## Tecnologias

- Next.js 14+
- TypeScript
- TailwindCSS
- React
- Docker / Docker Compose

## Estrutura do Projeto

- `src/`
  - `components/` Componentes reutilizáveis
  - `app/` Páginas do Next.js
  - `services/` Comunicação com API (fetch/axios)
  - `stores/` Estados globais com zustand
  - `validators/` Validações do front com Zod
  - `utils/` Helpers
- `public/` Assets públicos (imagens, fontes)
- `Dockerfile` Para containerização
- `package.json`
- `tsconfig.json`

## Rodando localmente (Docker)

1. Clone o repositório do frontend.
2. Garanta que você tenha **Docker** e **Docker Compose** instalados.
3. Se quiser rodar junto com o backend via docker-compose, utilize:

```bash
docker-compose up --build
```

Isso irá:

- Subir o frontend na porta 3000.

- Conectar automaticamente ao backend (configurado na ENV do container).

- Garantir que toda a aplicação esteja funcional dentro de containers isolados.

Observação: Certifique-se de que o backend também esteja rodando para que o frontend consiga consumir os endpoints da API.

## Arquitetura e comunicação

- Aplicação baseada em componentes React.

- UI Components com Shadcn/UI

- Estado gerenciado localmente, context API ou zustand.

- Consumo de API via axios para endpoints do backend.

- Roteamento via Next.js Pages / App Router.

- Estilos com TailwindCSS para facilitar consistência visual.

## Supondoções

- A aplicação assume que o backend está disponível em http://localhost:8080.

- Todos os dados de teste já são populados pelo backend via migrations e init.sql.

- Não é necessário criar dados manualmente para testes funcionais.

## Comandos úteis

- Rodar localmente:

```bash
yarn install
yarn dev
```