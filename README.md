# Star Wars Project

![Star Wars Logo](./src/app/icon.ico)

## 🚀 Sobre o Projeto

Este é um projeto Next.js que explora o universo Star Wars, utilizando a SWAPI (Star Wars API) para fornecer informações detalhadas sobre personagens e planetas da saga. O projeto demonstra boas práticas de desenvolvimento React, gerenciamento de estado, cache de dados e UI/UX moderno.

## 🚀 Como Executar

```bash
git clone
yarn install
Add .env: NEXT_PUBLIC_API_URL=https://swapi.dev/api
yarn next dev
(Jest) yarn test
```

## 🛠️ Tecnologias Principais

### Core
- **Next.js 14** - Framework React com renderização híbrida (SSR/CSR)
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Adiciona tipagem estática ao JavaScript

### Gerenciamento de Estado e Dados
- **@tanstack/react-query** - Gerenciamento de estado do servidor e cache
- **axios** - Cliente HTTP para requisições à API

### UI/UX
- **@radix-ui/themes** - Sistema de design moderno e acessível
- **@radix-ui/react-icons** - Conjunto de ícones consistentes
- **use-debounce** - Otimização de performance em inputs de busca

### Desenvolvimento e Qualidade
- **eslint** - Linter para manter consistência no código
- **jest** & **@testing-library** - Framework de testes e utilitários
- **prettier** - Formatador de código

## 🌟 Funcionalidades

- 👥 Listagem de Personagens
- 🌍 Exploração de Planetas
- 🔍 Busca em tempo real
- ⭐ Sistema de Favoritos
- 📱 Design Responsivo
- ♿ Acessibilidade
- 🔄 Paginação
- 💾 Cache de Dados

src/
├── app/                # Rotas e layouts
├── components/         # Componentes reutilizáveis
├── contexts/          # Contextos React
├── hooks/             # Hooks personalizados
├── services/          # Serviços e API
├── types/             # Tipagens TypeScript
└── constants/         # Constantes e configurações


## 🤝 Contribuição
Contribuições são bem-vindas!

## 📝 Licença
Este projeto está sob a licença MIT.

## 👤 Autor
Weslley Bastos
