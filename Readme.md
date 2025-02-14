# Desenho Avançado com IA

Este projeto é um aplicativo web interativo de desenho que combina funcionalidades básicas de desenho com recursos avançados de Inteligência Artificial (IA) usando JavaScript, HTML, CSS e, opcionalmente, um backend em Python com Flask.

## Funcionalidades

*   **Desenho à Mão Livre:** Desenhe livremente no canvas usando o mouse ou toque (em dispositivos touchscreen).
*   **Paleta de Cores:** Selecione cores a partir de uma paleta pré-definida ou use um seletor de cores para escolher cores personalizadas.
*   **Ajuste de Espessura do Pincel:** Controle a espessura do traço usando um controle deslizante.
*   **Borracha:** Apague partes do desenho.
*   **Desfazer/Refazer:** Desfaça e refaça ações de desenho.
*   **Limpar Canvas:** Limpe todo o canvas com um clique (com confirmação).
*   **Reconhecimento de Desenho com IA (TensorFlow.js):**
    *   Após desenhar, clique no botão "Prever Desenho" para que a IA tente identificar o que você desenhou.
    *   O aplicativo usa um modelo TensorFlow.js pré-treinado (MobileNet, por padrão, mas você deve substituí-lo por um modelo treinado para reconhecimento de desenhos, idealmente treinado com o dataset Quick, Draw!).
    *   As previsões da IA (com suas probabilidades) são exibidas abaixo do canvas.
*   **Salvar Desenho (Requer Backend):**
    *   Clique no botão "Salvar" para enviar o desenho para um servidor backend (opcional).
    *   O exemplo de backend fornecido (em Python/Flask) salva o desenho como um arquivo `.png`.
*   **Responsivo:** O layout se adapta a diferentes tamanhos de tela (desktop, tablet, mobile).
*   **Suporte a Touch:** Funciona em dispositivos touchscreen.

## Estrutura do Projeto


## Pré-requisitos

*   **Navegador Moderno:**  Chrome, Firefox, Edge ou Safari (versões recentes).
*   **Editor de Código:**  VS Code (recomendado), Sublime Text, Atom, etc.
*   **Conhecimento Básico:**  HTML, CSS, JavaScript.  Algum conhecimento de JavaScript assíncrono (`async`/`await`) e `fetch` é útil.
* **Backend (Opcional):**
    * **Python 3:** Se você quiser usar o backend para salvar desenhos.
    * **Flask e Flask-CORS:**
        ```bash
        pip install flask flask-cors
        ```

* **Modelo de IA (Essencial para a funcionalidade de IA):**
  * Você *precisa* de um modelo de aprendizado de máquina treinado para reconhecimento de desenhos, compatível com TensorFlow.js.
  * A melhor opção é *treinar seu próprio modelo* usando o TensorFlow.js (ou TensorFlow em Python e depois converter para TensorFlow.js) com o dataset Quick, Draw! do Google. Existem tutoriais online sobre como fazer isso.
  * Alternativamente, você pode procurar por modelos pré-treinados, mas certifique-se de que sejam compatíveis com TensorFlow.js e que reconheçam as classes de desenhos que você deseja.
  * **Hospedagem do Modelo:** Você precisará hospedar o arquivo `model.json` do seu modelo online (Google Cloud Storage, AWS S3, GitHub Pages, etc.) e obter o URL.

## Configuração e Execução (Frontend)

1.  **Clone o Repositório (ou Copie os Códigos):**
    ```bash
    git clone <URL do seu repositório>  # Se você estiver usando Git
    ```
    Ou simplesmente copie os códigos dos arquivos `index.html`, `style.css` e `script.js` para uma pasta no seu computador.

2.  **Substitua o URL do Modelo de IA:**
    *   No arquivo `script.js`, encontre a função `loadModel()`.
    *   Substitua o URL de exemplo (`https://storage.googleapis.com/.../model.json`) pelo URL *do seu modelo* treinado para reconhecimento de desenhos.

3.  **Ajuste `getClassNames()`:**
    *   No arquivo `script.js`, encontre a função `getClassNames()`.
    *   Substitua o array de exemplo `['gato', 'cachorro', ...]` por um array com os nomes das classes que o *seu modelo* reconhece, *na mesma ordem* em que o modelo as retorna.  Essa função faz o mapeamento entre os índices das previsões do modelo e os nomes das classes.

4.  **Abra `index.html` no Navegador:**
    *   Você pode simplesmente dar dois cliques no arquivo `index.html` para abri-lo no seu navegador.
    *   **Recomendado:** Use a extensão "Live Server" do VS Code (ou similar) para iniciar um servidor de desenvolvimento local.  Isso recarregará automaticamente a página quando você fizer alterações no código.

## Configuração e Execução (Backend - Opcional)

1.  **Certifique-se de ter o Python 3 e o `pip` instalados.**

2.  **Instale o Flask e o Flask-CORS:**
    ```bash
    pip install flask flask-cors
    ```

3.  **Salve o código do backend:**  Copie o código Python do `app.py` (fornecido em respostas anteriores) para um arquivo chamado `app.py` na mesma pasta do seu projeto (`desenho_com_js`).

4.  **Execute o backend:**
    *   Abra um terminal *na pasta do projeto*.
    *   Execute o seguinte comando:
        ```bash
        python app.py
        ```
    *   Você deverá ver uma mensagem indicando que o servidor Flask está rodando (geralmente em `http://localhost:5000`).  *Mantenha este terminal aberto enquanto estiver usando o aplicativo.*

5. **Ajuste o script.js (Frontend):**
   *  Certifique-se que no arquivo `script.js`, a função `saveDrawing()` o URL do `fetch` esteja usando o URL *completo* do backend (`http://localhost:5000/save`).

## Como Usar

1.  **Desenhe:** Use o mouse (ou toque) para desenhar no canvas.
2.  **Selecione Cores:** Clique nas amostras de cores na paleta ou use o seletor de cores para escolher cores personalizadas.
3.  **Ajuste a Espessura:** Use o controle deslizante para alterar a espessura do pincel.
4.  **Use a Borracha:** Clique no botão da borracha para alternar entre desenhar e apagar.
5.  **Desfaça/Refaça:** Use os botões de desfazer e refazer.
6.  **Limpe:** Clique no botão de limpar para limpar o canvas (uma caixa de diálogo de confirmação será exibida).
7.  **Prever Desenho (IA):** Após desenhar, clique no botão "Prever Desenho" para que a IA tente identificar o seu desenho.
8.  **Salvar (com Backend):** Se você configurou o backend, clique no botão "Salvar" para enviar o desenho para o servidor.

## Notas Importantes

*   **Modelo de IA:** A funcionalidade de reconhecimento de desenho depende *inteiramente* do modelo TensorFlow.js que você fornecer.  Sem um modelo treinado adequadamente, essa parte não funcionará.
*   **Backend (Opcional):** O backend (Python/Flask) é opcional.  Se você não precisar salvar os desenhos em um servidor, pode remover o botão "Salvar" e a função `saveDrawing()` do `script.js`.
*   **CORS:** Se você estiver usando o backend, certifique-se de ter o `flask-cors` instalado e configurado corretamente (`CORS(app)`) para evitar erros de Cross-Origin Resource Sharing.
* **Desempenho da IA:** O desempenho do reconhecimento de desenhos dependerá do tamanho e da complexidade do seu modelo, bem como do hardware do usuário. Modelos maiores e mais complexos podem ser mais lentos, especialmente em dispositivos mais antigos.

## Expansão e Melhorias

Este projeto é um ponto de partida.  Você pode expandi-lo de várias maneiras:

*   **Mais Ferramentas de Desenho:** Adicione ferramentas para desenhar formas geométricas (círculos, retângulos, etc.), linhas retas, preenchimento de áreas, etc.
*   **Edição de Imagens:** Implemente recursos de edição de imagens, como cortar, redimensionar, girar, aplicar filtros, etc. (você pode usar bibliotecas JavaScript como Jimp ou OpenCV.js para isso).
*   **IA Mais Avançada:**
    *   Use um modelo de IA mais sofisticado para reconhecimento de desenhos.
    *   Implemente *geração* de desenhos com IA (usando GANs ou VAEs, mas isso exigiria um backend poderoso e treinamento de modelos complexos).
    *   Adicione reconhecimento de objetos *dentro* do desenho (usando modelos de detecção de objetos).
*   **Interface de Usuário (UI) Mais Avançada:**
    *   Crie uma interface mais profissional e intuitiva.
    *   Adicione mais opções de personalização (por exemplo, temas).
    *   Implemente um sistema de camadas (como no Photoshop).
* **Backend Mais Robusto (se estiver usando):**
    * Implemente autenticação de usuário (login/cadastro).
    * Crie uma galeria de desenhos dos usuários.
    * Adicione a capacidade de compartilhar desenhos.
    * Use um banco de dados para armazenar informações sobre os desenhos.

Este README fornece uma visão geral completa do projeto, instruções de configuração e uso, e sugestões para expansão.  Divirta-se desenhando e explorando as possibilidades da IA!#   D r a w  
 