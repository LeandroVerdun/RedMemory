var scoreButton = document.getElementById('Score-Tab');
var playButton = document.getElementById('play');
var principal = document.getElementById('fondo-1');
var cards = document.querySelectorAll('.card');
var startTitle = document.getElementById('start');
var musicTitle = document.getElementById('music');
var winButton = document.getElementById("win");
var fondo = document.getElementById('fondo-1');
var stopwatchId;
var seconds = 0, minutes = 0, hours = 0;
var prevCard = null;
var flippedCardsCount = 0;
let initialScore = 0;
let currentScore = initialScore;
const cache = new Map();
var audio1 = new Audio('sounds//danger_zone.mp3');







function addPoint() {
	currentScore += 100;
	updateScore();
}

function updateScore() {
	const scoreElement = document.querySelector('.score');
	scoreElement.textContent = currentScore
}

function subtractPoint() {
	currentScore -= 20;
	updateScore();
}

function resetScore() {
	currentScore = initialScore;
	updateScore();
}

function pausePlay() {
	const musicPP = document.querySelector('.music')
	if (audio1.paused) {
			audio1.play();

		} else {
			audio1.pause();
		}
}


document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'c' || event.code === 'KeyC')) {
    var code = prompt('Introduce el código:');
    if (code === 'Red Engel') {
      var winButton = document.getElementById('win');
      winButton.style.display = 'inline-block';
    }
  }
});





cards.forEach(function(card) {

    card.addEventListener('click', function() {
        var cardClass = card.classList[1];
        var cardImage = card.querySelector('img');
       
        if (cardClass === 'A') {
            cardImage.src = 'card//imagen1.jpg';
        } else if (cardClass === 'B') {
            cardImage.src = 'card//imagen2.jpg';
        } else if (cardClass === 'C') {
            cardImage.src = 'card//imagen3.jpg';
        } else if (cardClass === 'D') {
            cardImage.src = 'card//imagen4.jpg';
        } else if (cardClass === 'E') {
            cardImage.src = 'card//imagen5.jpg';
        } else if (cardClass === 'F') {
            cardImage.src = 'card//imagen6.jpg';
        }

        if (prevCard !== null) {
            var prevCardImage = prevCard.querySelector('img');
            
            if (prevCard.classList[1] === cardClass) {
                prevCard = null;
                flippedCardsCount += 2;
                if (flippedCardsCount === cards.length) {
                	win();
                }
                addPoint();      
            } else {
            	subtractPoint();
                setTimeout(function() {
                	
                    cardImage.src = 'card//back_card.jpg';
                    prevCardImage.src = 'card//back_card.jpg';
                    prevCard = null;
                }, 1000);
            }
        } else {
        	
            prevCard = card;
        }
    });
});

function resetCards() {
    cards.forEach(function(card) {
        var cardImage = card.querySelector('img');
        cardImage.src = 'card//back_card.jpg';
    });
    flippedCardsCount = 0;
    resetScore()
}





function playGame() {

	const divTimer = document.createElement('div');
	const titleRed = document.createElement('div');
	const movingText = document.createElement('div');
	const textTitle = document.createElement('span');
	const stopwatch = document.createElement('span');
	const home1 = document.createElement('button');
	const resetButton = document.createElement('button');
	const pauseButton = document.createElement('button');
	const score = document.createElement('span');
	const scoreText = document.createElement('span');
	const musicButton = document.createElement('button');



	home1.classList.add('home-1')
    home1.innerHTML = '<i class="fa-solid fa-house"></i>'
	stopwatch.classList.add('stopwatch');
	stopwatch.textContent = '00:00:00';
	textTitle.classList.add('text-title');
	textTitle.textContent = '// Red Memory //';
	movingText.classList.add('moving-text');
	titleRed.classList.add('title-red');
	divTimer.classList.add('timer');
	resetButton.classList.add('reset');
	resetButton.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
	pauseButton.classList.add('pause');
	pauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
	score.classList.add('score');
	score.textContent = '000'
	scoreText.classList.add('score2', 'score');
	scoreText.textContent = 'Score:';
	musicButton.classList.add('music-button', 'music');
	musicButton.innerHTML = '<i class="fa-solid fa-volume-high">';


	document.body.appendChild(divTimer);
	document.body.appendChild(titleRed);
	titleRed.appendChild(movingText);
	movingText.appendChild(textTitle);
	divTimer.appendChild(stopwatch);
	divTimer.appendChild(home1);
	divTimer.appendChild(resetButton);
	divTimer.appendChild(pauseButton);
	divTimer.appendChild(score);
	divTimer.appendChild(scoreText);
	divTimer.appendChild(musicButton);

	musicButton.addEventListener('click', function(){

		pausePlay();

	})


	fondo.style.display = 'none';
	startStopwatch();
	audio1.currentTime = 0;
	audio1.play();
}







function pause() {

	const pauseH2 = document.createElement('h2');
	const pauseTitle = document.createElement('div');
	const pausePlay = document.createElement('button');
	const pauseHome = document.createElement('button');
	const pauseReset = document.createElement('button');
	const text = document.querySelector('.text-title');
	const pauseMusicButton = document.createElement('button');



    
	pauseTitle.classList.add('pause-title');
	pausePlay.classList.add('pause-play');
	pauseHome.classList.add('pause-home');
	pauseReset.classList.add('pause-reset');
	pauseH2.classList.add('pause-h2');
	pauseH2.textContent = "Pause";
	pauseHome.innerHTML = '<i class="fa-solid fa-house"></i>';
	pausePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
	pauseReset.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
	pauseMusicButton.classList.add('pause-music-button', 'music');
	pauseMusicButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;



    fondo.appendChild(pauseTitle);
	pauseTitle.appendChild(pausePlay);
    pauseTitle.appendChild(pauseHome);
    pauseTitle.appendChild(pauseReset);
    pauseTitle.appendChild(pauseH2);
    pauseTitle.appendChild(pauseMusicButton);


    pauseMusicButton.addEventListener('click', function() {
    	const music = document.querySelector('.music')
	    if (audio1.paused) {
			audio1.play();
		    music.innerHTML = '<i class="fa-solid fa-volume-high">';

		} else {
			audio1.pause();
			music.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
		}
    })


    stopStopwatch();

	pauseReset.addEventListener('click', function(){

		fondo.style.display = 'flex';
		})

	pausePlay.addEventListener('click', function() {

			fondo.style.display = 'none';
			text.textContent = '// Red Memory //';
			pauseTitle.remove();

			startStopwatch();
		})

	pauseReset.addEventListener('click', function() {
		reset();
		pauseTitle.remove();
	})

	fondo.style.display = 'flex';
	startTitle.style.display = 'none';
	text.textContent = '// Pause //';


}


function reset() {

	const divTimer = document.querySelector('.timer');
	const titleRed = document.querySelector('.title-red');



	resetTimer();
	resetCards();
	audio1.pause();
	shuffleCards();

	divTimer.remove();
	titleRed.remove();
	

	fondo.style.display= 'flex';
	startTitle.style.display = 'grid';


}


function scoreTab() {

	const closeButton = document.createElement('button');
	const divScore = document.createElement('div');
	divScore.classList.add('score-div');
	closeButton.classList.add('close');
	closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'

	divScore.appendChild(closeButton);
	principal.appendChild(divScore);


	closeButton.addEventListener('click', function(){
		closeButton.remove();
		divScore.remove();
	})


}


scoreButton.addEventListener('click', function(){

	scoreTab()
});


playButton.addEventListener('click', function() {


	playGame();

	const pauseButton = document.querySelector('.pause')
	const resetButton = document.querySelector('.reset')


	resetButton.addEventListener('click', function(){
		reset();
	})


	

	pauseButton.addEventListener('click', function() {
		pause();
	})

})

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function startStopwatch() {
	stopwatchId = setInterval(updateTimer, 1000);
}

function stopStopwatch() {
	clearInterval(stopwatchId);
}

function resetTimer() {
	stopStopwatch();
	seconds = 0;
	minutes = 0;
	hours = 0;

	var stopwatch = document.querySelector('.stopwatch');
	stopwatch.textContent = '00:00:00';
}

function updateTimer() {
	seconds++;


	if (seconds >= 60) {
		seconds = 0;
		minutes++;


		if (minutes >= 60) {
		minutes = 0;
		hours++;
	    }
	}

	var time = (hours ? (hours > 9 ? hour : "0" + hours) : "00") + ":" +
	           (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
	           (seconds > 9 ? seconds : "0" + seconds);

	var stopwatch = document.querySelector('.stopwatch');
	stopwatch.textContent = time;
	
}

shuffleCards();



winButton.addEventListener('click', function(){
	win();


	

})


function win() {
    const winMessage = document.createElement('div');
    const winText = document.createElement('div');
    const winScore = document.createElement('span');
    const score = document.querySelector('.score');
    const scoreText = document.querySelector('.score2');
    const timer = document.querySelector('.stopwatch');
    const timerWin = document.createElement('span');
    const inputWin = document.createElement('input');
    const sendButton = document.createElement('button');
    let winScoreValue = parseInt(currentScore) + 100;

    winMessage.classList.add('win-message');
    winText.classList.add('win-text');
    winText.textContent = 'You Win';
    winScore.classList.add('win-score');
    winScore.textContent = scoreText.textContent + " " + (parseInt(score.textContent) + 100);
    timerWin.classList.add('win-timer');
    timerWin.textContent = timer.textContent;
    inputWin.classList.add('win-input');
    inputWin.setAttribute('type', 'text');
    inputWin.setAttribute('maxlength', '3');
    inputWin.setAttribute('placeholder', 'Enter Your Name');
    sendButton.classList.add('send-button');
    sendButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';

    fondo.appendChild(winMessage);
    winMessage.appendChild(winText);
    winMessage.appendChild(winScore);
    winMessage.appendChild(timerWin);
    winMessage.appendChild(inputWin);
    winMessage.appendChild(sendButton);

    function save(nameF, scoreF, timeF) {
        const data = { name: nameF, score: scoreF, time: timeF };
        fetch(`http://localhost/Red%20Memory/score.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('success', data);
        })
        .catch((error) => {
            console.error('error', error);
        });

        cache.set(nameF, data);

        if (cache.size > 10) {
            const firstElement = cache.keys().next().value;
            cache.delete(firstElement);
        }
    }

    sendButton.addEventListener('click', function() {
        const inputName = inputWin.value.trim();

        if (inputName === '') {
            alert('Por favor, introduce un nombre');
            return;
        }

        save(inputWin.value, score.textContent, timerWin.textContent);

        const scoreTabWin = document.createElement('button');
        const restart = document.createElement('button');
        const home = document.createElement('button');
        const name = document.createElement('span');
        const nameTitle = document.createElement('span');
        const timeTitle = document.createElement('span');
        const scoreTitle = document.createElement('span');

        scoreTabWin.classList.add('score-tab-button');
        restart.classList.add('restart');
        home.classList.add('home');
        scoreTabWin.innerHTML = '<i class="fa-solid fa-list"></i>';
        home.innerHTML = '<i class="fa-solid fa-house"></i>';
        restart.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        winMessage.classList.toggle('win-message');
        winMessage.classList.toggle('win-message2');
        timerWin.classList.toggle('win-timer');
        timerWin.classList.toggle('win-timer2');
        winScore.classList.toggle('win-score');
        winScore.classList.toggle('win-score2');
        name.classList.add('name');
        name.textContent = inputWin.value;
        nameTitle.classList.add('name-title');
        timeTitle.classList.add('time-title');
        scoreTitle.classList.add('score-title');
        nameTitle.textContent = 'Name:';
        timeTitle.textContent = 'Time:';
        scoreTitle.textContent = 'Score:';

        scoreTabWin.addEventListener('click', function() {
            scoreTab();
        });

        restart.addEventListener('click', function() {
            winMessage.remove();
            reset();
        });

        winMessage.appendChild(scoreTabWin);
        winMessage.appendChild(restart);
        winMessage.appendChild(home);
        winMessage.appendChild(name);
        winMessage.appendChild(nameTitle);
        winMessage.appendChild(timeTitle);
        winMessage.appendChild(scoreTitle);

        inputWin.remove();
        sendButton.remove();
    });

    stopStopwatch();

    let titleWin = document.querySelector('.text-title');
    fondo.style.display = 'flex';
    startTitle.style.display = 'none';
    titleWin.textContent = '// You Win //';
}

// Corrección de la definición duplicada de la función `save`
// y asegurarse de no tener funciones definidas dos veces.

musicTitle.addEventListener('click', function() {
    pausePlay();
});
