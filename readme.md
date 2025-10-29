# ⚡️ PokeDash

> Aplicativo mobile em **React Native (Expo + TypeScript)** que consome a API **NestJS PokeAPI** e exibe as habilidades de qualquer Pokémon pesquisado, com autenticação JWT.

---

## 📱 Sobre o projeto

O **PokeDash** é um app que permite:

- Fazer **login** e **cadastro** de usuários via API (JWT)
- Pesquisar Pokémon pelo nome e listar suas **habilidades**
- Manter o usuário autenticado (via **React Context + AsyncStorage**)
- Fazer logout de forma segura

A stack foi construída com foco em boas práticas e tipagem forte.

---

## 🧰 Stack principal

| Tecnologia                 | Descrição                                          |
| -------------------------- | -------------------------------------------------- |
| **Expo**                   | Framework React Native com suporte multiplataforma |
| **TypeScript**             | Tipagem estática para maior segurança              |
| **Axios**                  | Cliente HTTP para comunicação com a API            |
| **Zod**                    | Validação de formulários de login/cadastro         |
| **React Navigation**       | Navegação entre telas                              |
| **React Context API**      | Controle de autenticação global                    |
| **AsyncStorage**           | Persistência do token JWT                          |
| **Jest + Testing Library** | (opcional) Testes unitários de componentes         |

---

## 🏗️ Estrutura do projeto

```
pokedash/
├─ src/
│  ├─ components/        # Botões, campos, banners, etc.
│  ├─ screens/           # Telas (Login, Signup, Home)
│  ├─ context/           # AuthContext (login/logout)
│  ├─ services/          # Axios + integração com API
│  ├─ utils/             # Funções auxiliares
│  └─ App.tsx
├─ app.json
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## ⚙️ Pré-requisitos

- Node.js 18+
- Yarn ou npm
- Expo CLI
  ```bash
  npm install -g expo-cli
  ```
- API NestJS rodando localmente (porta padrão: **3000**)  
  → [Guia da API NestJS PokeAPI](../api/README.md)

---

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/pokedash.git
   cd pokedash
   ```

2. Instale as dependências:

   ```bash
   yarn
   # ou
   npm install
   ```

3. Crie o arquivo `.env` na raiz do app:

   ```env
   API_BASE_URL=http://localhost:3000
   ```

   > ⚠️ Se estiver usando o Expo Go em celular físico, troque `localhost` pelo IP da sua máquina.  
   > Exemplo:  
   > `API_BASE_URL=http://192.168.0.10:3000`

---

## ▶️ Executar o app

### Rodar localmente (emulador ou celular)

```bash
yarn start
# ou
npx expo start
```

- Escolha **i** para iOS Simulator
- Escolha **a** para Android Emulator
- Ou escaneie o QR Code com o app **Expo Go**

---

## 🔐 Fluxo de autenticação

### 1. Cadastro (`/auth/signup`)

**Body**

```json
{
  "name": "Ash Ketchum",
  "email": "ash@pokedash.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

**Resposta**

```json
{ "success": true }
```

---

### 2. Login (`/auth/signin`)

**Body**

```json
{
  "email": "ash@pokedash.com",
  "password": "123456"
}
```

**Resposta**

```json
{
  "token": "jwt_token_aqui",
  "name": "Ash",
  "email": "ash@pokedash.com"
}
```

---

### 3. Token armazenado no AsyncStorage

Ao abrir o app novamente, o usuário permanece logado automaticamente.

---

## 🧭 Telas principais

| Tela              | Descrição                                                                               |
| ----------------- | --------------------------------------------------------------------------------------- |
| **Login**         | Campos: email e senha (validação com Zod)                                               |
| **Cadastro**      | Campos: nome, email, senha e confirmar senha                                            |
| **Home**          | Mostra “Bem-vindo {nome}”, campo de busca e botão para sair                             |
| **Busca Pokémon** | Campo + botão → chama `/pokemon/fetch-skills-by-pokemon-name-order-by-skill-name/:name` |
| **Resultado**     | Lista nome do Pokémon e suas habilidades ordenadas                                      |

---

## 📡 Comunicação com API

Exemplo de serviço em `src/services/pokeapi.ts`:

```ts
import axios from "axios";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: `${API_BASE_URL}/pokemon`,
});

export const fetchPokemon = async (name: string) => {
  const res = await api.get(
    `/fetch-skills-by-pokemon-name-order-by-skill-name/${name}`
  );
  return res.data;
};
```

---

## 🧠 Contexto de Autenticação

O contexto (`src/context/AuthContext.tsx`) mantém o usuário logado globalmente:

```tsx
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInUser = async (email: string, password: string) => {
    const { data } = await api.post("/auth/signin", { email, password });
    await AsyncStorage.setItem("token", data.token);
    setUser(data);
  };

  const signOutUser = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInUser, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🧩 Componentes principais

| Componente      | Função                                        |
| --------------- | --------------------------------------------- |
| `PrimaryButton` | Botão padrão do app                           |
| `SearchBar`     | Input + botão para buscar Pokémon             |
| `ErrorBanner`   | Exibe mensagens de erro                       |
| `LoadingBlock`  | Indicador de carregamento                     |
| `ResultCard`    | Exibe resultado da busca (nome e habilidades) |

---

## 🧪 Testes (opcional)

Você pode rodar os testes unitários de componentes:

```bash
yarn test
```

---

## 📦 Build do App

Para gerar build com Expo EAS:

```bash
npx eas build --platform android
# ou
npx eas build --platform ios
```

> Certifique-se de estar logado com `expo login`.

---

## 🧠 Dica

Se quiser rodar a API NestJS e o app mobile juntos via Docker Compose, basta incluir os dois serviços (`api` e `app`) no mesmo `docker-compose.yml`, e usar a network compartilhada para comunicação.

---

## 🐛 Troubleshooting

- **Erro de rede no app:** verifique se o IP no `.env` é acessível pelo celular.
- **API sem resposta:** garanta que o NestJS está rodando (`yarn start:dev`).
- **Token expirado:** basta sair e entrar novamente.

---

## 👨‍💻 Autor

**Rafael Silverio**  
Desenvolvedor Fullstack Sênior • NestJS | React Native | TypeScript  
🚀 [LinkedIn](https://www.linkedin.com/in/rafael-silverio) | [GitHub](https://github.com/Faelst)
