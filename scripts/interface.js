/*  Const Dos Audio */
const coinAudio = new Audio('assets/audio/moeda.mp3');
const audioMissed = new Audio('assets/audio/errou.mp3');


/* Blibioteca De cores */
let engine = {
    "colors": ['green', 'purple', 'pink', 'red', 'blue', 'yellow', 'orange',
        'gray', 'black', 'Aqua', 'Chocolate', 'Indigo'
    ],
    "hexadecimais": {
        'green': '#3bff00',
        'purple': '#a100ff',
        'pink': '#ff00c7',
        'red': '#ff0000',
        'blue': '#1000ff',
        'yellow': '#ecff23',
        'orange': '#ff8c00',
        'gray': '#a8a8a8',
        'black': '#000000',
        'Aqua': '#00FFFF',
        'Chocolate': '#D2691E',
        'Indigo': '#4B0082'


    },
    "coins": 0
};

/* Função Que Sortea As Cores */
function drawColor() {
    let drawnColor = Math.floor(Math.random() * engine.colors.length);
    let boxColorCaption = document.getElementById("color-name");
    let nameDrawnColor = engine.colors[drawnColor];

    boxColorCaption.innerText = nameDrawnColor.toUpperCase();

    return engine.hexadecimais[nameDrawnColor];
};

/* Função Que Aplica As Cores Na Box */
function applyBoxColor(colorName) {
    let colorBox = document.querySelector(".current-color");

    colorBox.style.backgroundColor = colorName;
    colorBox.style.backgroundImage = "url('./assets/caixa-fechada.png')"
    colorBox.style.backgroundSize = "100%"

};
/* Função Que Atualiza Nossa Pontuação */
function updateScore(value) {
    let score = document.getElementById("current-score");

    engine.coins += value;

    if (value < 0) {
        audioMissed.play()
    } else {
        coinAudio.play()
    }
    score.innerText = engine.coins;
}

applyBoxColor(drawColor())

let btnRecorder = document.querySelector(".reply-btn");
let audioTranscription = "";
let correctAnswer = "";


/* A API Responsalve Pelo Reconhecimento de Voz */
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var speechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recorder = new speechAPI();

    recorder.continuos = false;
    recorder.lang = "en-US";

    recorder.onstart = () => {
        btnRecorder.innerText = 'estou ouvindo'

        btnRecorder.style.backgroundColor = "white";
        btnRecorder.style.color = "black";
    }

    recorder.onend = () => {
        btnRecorder.innerText = 'Responder'

        btnRecorder.style.backgroundColor = "transparent";
        btnRecorder.style.color = "white";
    }

    recorder.onresult = (event) => {
        audioTranscription = event.results[0][0].transcript.toUpperCase();
        correctAnswer = document.getElementById("color-name").innerText.toUpperCase();
        console.log(audioTranscription);

        if (audioTranscription === correctAnswer) {
            updateScore(1)
        } else {
            updateScore(-1)
        }
        applyBoxColor(drawColor())
    }
} else {
    alert("seu navegador não suporta às funcionalidades do site")
}

btnRecorder.addEventListener("click", () => {
    recorder.start();
})