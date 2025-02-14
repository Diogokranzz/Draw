// --- Variáveis Globais e Captura de Elementos ---
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const colorPalette = document.querySelector('.color-palette');
const colorPicker = document.getElementById('colorPicker'); //O input escondido.
const brushSizeSlider = document.getElementById('brushSize');
const eraserButton = document.getElementById('eraserButton');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const clearButton = document.getElementById('clearButton');
const predictButton = document.getElementById('predictButton');
const saveButton = document.getElementById('saveButton'); // Captura o botão de salvar
const resultsDiv = document.getElementById('results');


let currentColor = '#000000';
let currentBrushSize = brushSizeSlider.value;
let isErasing = false;
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let history = [];
let historyStep = -1;
let model; // Variável para armazenar o modelo TensorFlow.js

// --- Funções de Inicialização ---

// Carrega o modelo TensorFlow.js (substitua pelo URL do seu modelo)
async function loadModel() {
    resultsDiv.innerHTML = "<p>Carregando modelo...</p>";
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'); //Exemplo usando mobilenet.
    //Se o modelo que voce usar precisar de preprocessamento, faça aqui. Ex:
    // model.predict(tf.zeros([1, 224, 224, 3])).dispose(); // "Aquece" o modelo
     resultsDiv.innerHTML = "";
    console.log("Modelo carregado!");
}
//Função para os clicks na paleta de cores
function onColorSwatchClick(event){
   //Remove a classe 'active' de todos os swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.classList.remove('active');
    });

    //Adiciona a classe 'active' no swatch clicado
    const clickedSwatch = event.target;
    clickedSwatch.classList.add('active');

    //Atualiza a cor atual
    currentColor = clickedSwatch.dataset.color;
}

// --- Funções de Desenho ---
//(Mesmas funções draw(), mouseMoveEvent(), mouseUpEvent() do exemplo anterior,
// MAS com a adição de touch events para suporte a dispositivos móveis)

function saveCanvasState() {
    historyStep++;
    if (historyStep < history.length) {
        history.length = historyStep;
    }
    history.push(canvas.toDataURL());
}

function getCoordinates(event){
    let x, y;
      if (event.type.startsWith('touch')) {
        //Evento Touch
        x = event.touches[0].clientX - canvas.offsetLeft;
        y = event.touches[0].clientY - canvas.offsetTop;
    } else {
        //Evento Mouse
        x = event.offsetX;
        y = event.offsetY;
    }
    return {x,y};
}

function mouseDownEvent(event) {
    event.preventDefault(); //Evita comportamento default
    canDraw = true;
    const coords = getCoordinates(event);
    mouseX = coords.x;
    mouseY = coords.y;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
}

function mouseMoveEvent(event) {
  event.preventDefault();
    if (!canDraw) return;
    const coords = getCoordinates(event);
    const newMouseX = coords.x;
    const newMouseY = coords.y;
    draw(newMouseX, newMouseY);
    mouseX = newMouseX;
    mouseY = newMouseY;
}
function draw(x, y) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = currentBrushSize;
    ctx.strokeStyle = isErasing ? 'white' : currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); //Mantem o beginPath aqui.
    ctx.moveTo(x,y);

}
function mouseUpEvent(event) {
    event.preventDefault();
    if (canDraw) {
        canDraw = false;
        saveCanvasState();
    }
}
// --- Event Listeners ---

// Inicializa o histórico
saveCanvasState();

// Eventos da paleta de cores
colorPalette.addEventListener('click', onColorSwatchClick);

//Evento para quando trocar a cor no input escondido
colorPicker.onchange = (event) =>{
  currentColor = event.target.value;
   //Remove a classe 'active' de todos os swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.classList.remove('active');
    });
}

// Evento do tamanho do pincel
brushSizeSlider.oninput = () => {  currentBrushSize = brushSizeSlider.value; };

// Evento do botão da borracha
eraserButton.onclick = () => {
    isErasing = !isErasing;
    eraserButton.classList.toggle('active');
};

// Eventos do mouse no canvas
canvas.addEventListener('mousedown', mouseDownEvent);
canvas.addEventListener('mousemove', mouseMoveEvent);
canvas.addEventListener('mouseup', mouseUpEvent);
canvas.addEventListener('mouseleave', mouseUpEvent);

//Adiciona suporte a eventos touch
canvas.addEventListener('touchstart', mouseDownEvent);
canvas.addEventListener('touchmove', mouseMoveEvent);
canvas.addEventListener('touchend', mouseUpEvent);


// Evento do botão de limpar
clearButton.onclick = () => {
    if (confirm('Tem certeza que quer limpar o quadro?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
         saveCanvasState();
        historyStep = 0; // Reset history step
        history = [history[0]]; //Mantem o estado inicial.
        resultsDiv.innerHTML = ""; //Limpa as previsoes
    }
};

// Eventos de desfazer/refazer (mesmos do exemplo anterior)
undoButton.onclick = undo;
redoButton.onclick = redo;

function undo() {
    if (historyStep > 0) {
        historyStep--;
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = history[historyStep];
    }
}

function redo() {
    if (historyStep < history.length - 1) {
        historyStep++;
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = history[historyStep];
    }
}

// --- Função de Previsão (IA) ---
predictButton.onclick =  recognizeDrawing; //Chama a função ao clicar.

async function recognizeDrawing() {
  if (!model) {
        alert("O modelo ainda não foi carregado!");
        return;
    }
  // 1. Capturar a imagem do canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // 2. Pré-processar (redimensionar, normalizar, etc.)
  const tensor = tf.browser.fromPixels(imageData)
    .resizeNearestNeighbor([224, 224]) // Redimensionar para o tamanho esperado pelo modelo (ex: 28x28, 224x224)
    .mean(2) // Converter para escala de cinza. Se o modelo espera RGB, remova essa linha.
    .expandDims() // Adicionar dimensão (batch size)
    .toFloat()
    .div(tf.scalar(255)); // Normalizar [0, 1]


    //3. Fazer a inferência
  const predictions = await model.predict(tensor).data();



  // 4. Processar os resultados
  const topPredictions = Array.from(predictions)
    .map((probability, index) => ({
      probability: probability,
      className: getClassNames()[index] // Função para mapear índices para nomes de classes
    }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5); // Pegar as 5 previsões mais prováveis

    resultsDiv.innerHTML = ''; //Limpa os resultados
      topPredictions.forEach(prediction => {
        resultsDiv.innerHTML += `<p>${prediction.className}: ${Math.round(prediction.probability * 100)}%</p>`;
      });
}

function getClassNames() {
// Substitua isso pelo seu mapeamento correto de classes, algo como:
// Se voce treinou o modelo, voce precisa saber quais as classes que voce usou.
   return ['gato', 'cachorro', 'casa', 'arvore', 'carro', 'bicicleta', 'pessoa', 'sol', 'lua', 'estrela']; //Exemplo
}

// --- Função para Salvar (Requisição ao Backend) ---
async function saveDrawing() {
    const imageDataURL = canvas.toDataURL(); // Obtém a imagem como uma string Data URL

    try {
        const response = await fetch('http://localhost:5000/save', { // URL completo do backend!
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageDataURL }) // Envia a imagem no corpo da requisição
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Desenho salvo:', data);
            alert("Desenho salvo com sucesso!");
        } else {
            console.error('Erro ao salvar:', response.status);
            alert("Erro ao salvar o desenho.");
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert("Erro ao salvar o desenho.");
    }
}

// --- Inicialização ---
loadModel(); // Carrega o modelo ao iniciar a página