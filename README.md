# Battle Royale Twitch

## Configuração

Defina as variáveis de ambiente abaixo antes de rodar o projeto:

```bash
TWITCH_CLIENT_ID=seu_client_id
TWITCH_CLIENT_SECRET=seu_client_secret
TWITCH_REDIRECT=http://localhost:3000/api/auth/twitch
```

Se `TWITCH_REDIRECT` não estiver definido, a API tenta montar a URL com base nos headers da requisição.

## Como rodar

```bash
npm install
npm run dev
```

## Testes

```bash
npm test
```
