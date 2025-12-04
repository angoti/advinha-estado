# Adivinha Estado

Aplicativo mobile simples (Expo / React Native) para adivinhar estados do Brasil a partir de mapas. O fluxo básico possui 3 telas: início, jogo e tela de vitória. As imagens dos mapas e a lógica do jogo estão em components/Jogo.js, e a navegação é feita por um estado simples em App.js.

## Tecnologias e dependências principais
- Expo (registro com `registerRootComponent`)
- React Native
- Expo Go / Expo CLI para desenvolvimento
- @expo-google-fonts/poppins (carregamento de fontes)
- Componentes nativos do React Native (View, Image, TextInput, Pressable, Alert, KeyboardAvoidingView, ActivityIndicator, etc.)

Observação: o projeto foi criado e testado usando o fluxo do Expo (Snack/Expo Go). Se quiser gerar builds nativos, use EAS Build ou a CLI do Expo.

## Pré-requisitos
- Node.js (versão estável recomendada)
- npm ou yarn
- Expo CLI (opcional, para desenvolvimento local): instalar com `npm install -g expo-cli` ou usar diretamente `npx expo`
- Expo Go (aplicativo no celular) para testar rapidamente via QR code

## Instalação (local)
1. Clone o repositório:
   - git clone https://github.com/hoongoi/advinha-estado.git
   - cd advinha-estado
2. Instale dependências:
   - npm install
   - ou
   - yarn install

## Executando o app
- Iniciar o servidor do Expo:
  - npx expo start
  - ou, se instalou globalmente:
  - expo start
- Abra no celular com Expo Go escaneando o QR code ou abra em emulador iOS/Android.

## Estrutura do projeto (síntese)
- App.js — controla qual "tela" está ativa por meio de um estado (`tela`) e monta os componentes.
- index.js — registro do componente raiz com Expo.
- components/
  - Inicio.js — tela inicial com botão "Começar".
  - Jogo.js — lógica principal do jogo: exibe a imagem do mapa atual, recebe entrada do usuário e valida a resposta.
  - Ganhou.js — tela exibida quando o usuário completa todos os mapas.
- assets/ — imagens dos mapas e imagens usadas nas telas (ex.: image.png, ganhou2.png, pernam.png, acre.png, ...)

## Como adicionar/editar mapas (guia rápido)
1. Adicione a imagem do mapa em `assets/` (ex: `meuestado.png`).
2. Abra `components/Jogo.js` e adicione um item ao array `listaDeMapas` com o formato:
   { estado: "Nome do Estado", mapa: require("../assets/meuestado.png") }
3. A ordem em `listaDeMapas` define a sequência do jogo.

## Observações sobre entrada do usuário
- A validação no jogo compara strings exatamente como definidas em `listaDeMapas` (uso de `===`). Isso significa que acentos e capitalização devem bater exatamente com o texto do array (ex.: "Piauí", "Espírito Santo").
- Recomendações futuras:
  - Normalizar entrada (remover acentuação e case-insensitive) para tornar o jogo mais tolerante a variações.
  - Validar e limpar espaços em branco.

## Possíveis melhorias
- Tornar a checagem de respostas case-insensitive e sem acentos.
- Adicionar feedback visual em vez de Alerts.
- Usar um gerenciador de rotas (React Navigation) caso o app cresça.
- Adicionar banco de dados/localStorage para salvar progresso/placar.

## Rodando em produção / build nativo
- Para builds nativos e deploy, use EAS (Expo Application Services) ou o fluxo de build do Expo:
  - Documentação: https://docs.expo.dev/
  - Exemplo: `eas build --platform android` (requer configuração prévia)

## Testes
- Não há testes automatizados configurados no repositório atualmente. Testes manuais podem ser executados pelo fluxo citado em "Executando o app".

## Observações finais / notas do desenvolvedor
- O projeto é pequeno e fácil de estender. A navegação entre telas é implementada por um simples estado (`tela`) em App.js — para maior escala, considere adicionar React Navigation.
- Se for publicar, verifique nomes de imagens/paths e remova assets desnecessários para reduzir o tamanho do bundle.

## Contato
- Autoras: Marcella Reis, Anna Júlia Maciel, Samarah Gazana e Ingryd Moreira.
- Para sugestões de melhoria ou bugs, abra uma issue no repositório.
