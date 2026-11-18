# André Lanches — App React Native (Expo)

Versão mobile do site estático "André Lanches", feita com React Native + Expo (JavaScript).

## Como rodar
```bash
npm install
npx expo install --fix   # alinha as versões ao SDK instalado
npx expo start           # escaneie o QR Code com o Expo Go
```

## Estrutura
- `App.jsx` — raiz: estado da tela ativa, SafeAreaView, composição
- `src/components/` — Header, BannerPromocao, ListaProdutos, SobreNos, Contato, EntregaFlutuante
- `src/data/produtos.js` — cardápio, promoção e telefone (altere `TELEFONE_LINK` para testar a discagem)
- `src/theme/theme.js` — cores, espaçamentos e sombras

## Publicação
```bash
npx eas-cli login
npx eas-cli update --branch main --message "primeira versão"
```
