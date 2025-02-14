# Desenho Avançado com IA

Este projeto é um aplicativo web interativo de desenho que combina funcionalidades básicas de desenho com recursos avançados de Inteligência Artificial (IA) usando JavaScript, HTML e CSS.

## Funcionalidades

- **Desenho à Mão Livre:** Desenhe livremente no canvas usando o mouse ou toque (em dispositivos touchscreen).
- **Paleta de Cores:** Selecione cores a partir de uma paleta pré-definida ou use um seletor de cores para escolher cores personalizadas.
- **Ajuste de Espessura do Pincel:** Controle a espessura do traço usando um controle deslizante.
- **Borracha:** Apague partes do desenho.
- **Desfazer/Refazer:** Desfaça e refaça ações de desenho.
- **Limpar Canvas:** Limpe todo o canvas com um clique (com confirmação).
- **Reconhecimento de Desenho com IA (TensorFlow.js):**
  - Após desenhar, clique no botão "Prever Desenho" para que a IA tente identificar o que você desenhou.
  - O aplicativo usa um modelo TensorFlow.js pré-treinado (MobileNet, por padrão, mas você deve substituí-lo por um modelo treinado para reconhecimento de desenhos, idealmente treinado com o dataset Quick, Draw!).
  - As previsões da IA (com suas probabilidades) são exibidas abaixo do canvas.
- **Responsivo:** O layout se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).
- **Suporte a Touch:** Funciona em dispositivos touchscreen.

## Estrutura do Projeto

- **Frontend:**
  - `index.html`: Estrutura HTML do aplicativo.
  - `style.css`: Estilos CSS para a interface do usuário.
  - `script.js`: Lógica JavaScript para funcionalidades de desenho e integração com IA.

## Pré-requisitos

- **Navegador Moderno:** Chrome, Firefox, Edge ou Safari (versões recentes).
- **Editor de Código:** VS Code (recomendado), Sublime Text, Atom, etc.
- **Conhecimento Básico:** HTML, CSS, JavaScript. Algum conhecimento de JavaScript assíncrono (`async`/`await`) e `fetch` é útil.
- **Modelo de IA (Essencial para a funcionalidade de IA):**
  - Você *precisa* de um modelo de aprendizado de máquina treinado para reconhecimento de desenhos, compatível com TensorFlow.js.
  - A melhor opção é *treinar seu próprio modelo* usando o TensorFlow.js (ou TensorFlow em Python e depois converter para TensorFlow.js) com o dataset Quick, Draw! do Google. Existem tutoriais online sobre como fazer isso.
  - Alternativamente, você pode procurar por modelos pré-treinados, mas certifique-se de que sejam compatíveis com TensorFlow.js e que reconheçam as classes de desenhos que você deseja.
- **Hospedagem do Modelo:** Você precisará hospedar o arquivo `model.json` do seu modelo online (Google Cloud Storage, AWS S3, GitHub Pages, etc.) e obter o URL.

## Configuração e Execução (Frontend)

1. **Clone o Repositório (ou Copie os Códigos):**
   ```bash
   git clone # Se você estiver usando Git#
