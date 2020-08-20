document.addEventListener('DOMContentLoaded', () => {

    const defaultImage = 'assets/images/ireland.jpg',
        maxFlip = 2,
        cardList = [
            {
                name: 'waterfall',
                img: 'assets/images/waterfall.jpg'
            },
            {
                name: 'beach',
                img: 'assets/images/donegal_beach.jpg'
            },
            {
                name: 'island',
                img: 'assets/images/skellig_michael.jpg'
            },
            {
                name: 'mountains',
                img: 'assets/images/mountains.jpg'
            },
            {
                name: 'national park',
                img: 'assets/images/national_park.jpg'
            },
            {
                name: 'portnoo',
                img: 'assets/images/portnoo.jpg'
            },
            {
                name: 'dolmen',
                img: 'assets/images/dolmen.jpg'
            },
            {
                name: 'forty',
                img: 'assets/images/forty_foot.jpg'
            },
            {
                name: 'breeches',
                img: 'assets/images/the_breeches.jpg'
            },
            {
                name: 'bective',
                img: 'assets/images/bective.jpg'
            },
            {
                name: 'letterfrack',
                img: 'assets/images/cliff.jpg'
            },
            {
                name: 'lake',
                img: 'assets/images/lake.jpg'
            }
        ],
        gameWin = document.querySelector('win-overlay'),
        gameOver = document.querySelector('lose-overlay'),
        clickCounter = document.querySelector('click-counter');


    let gameCards = [...cardList, ...cardList],
        lockBoard = false,
        flipCounter = 0,
        matchedCards = [],
        clicks = 0,
        timeRemaining;

    var currentName = "";

    // function from stack overflow
    function gameTimer(duration, display) {
        let timer = duration, minutes, seconds;

        let id = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                clearTimeout(id);
            }
        }, 1000);
    }

    //turn this into startTimer function
    //start timer on first card click
    let gameBoard = document.querySelector('.board');
    gameBoard.onclick = (function () {

        let firstClick = 0;
        firstClick++;
        // let card = document.createElement('img');
        //e.target = card;
        if (firstClick === 1) {
            gameBoard.removeAttribute('onclick');
        }    //Fix time!!
        let timeRemaining = 60 / 10,
            display = document.querySelector('#timer');
        gameTimer(timeRemaining, display);
        //console.log(gameTimer(timeRemaining, display)) 
    });

    //increment flip counter with every card click
    function flipCount(clicks) {
        let click = document.getElementsByClassName('clicker');
        click.addEventListener('click', function () {
            click++;
            clickCounter.innerHTML = click;
        });
    };


    function shuffleCards(array) {
        let arr_len = array.length - 1, temp, index;

        while (arr_len > 0) {
            // Set random index
            index = Math.floor(Math.random() * arr_len);
            // decrease the array_length by 1
            arr_len--;

            // Perform swap
            temp = array[arr_len];
            array[arr_len] = array[index];
            array[index] = temp;
        }
    };



    function createBoard(gameCards) {
        const grid = document.getElementById('grid');
        gameCards.forEach(element => {
            let card = document.createElement('img');
            card.setAttribute('src', defaultImage);
            card.setAttribute('data-name', element.name);
            card.setAttribute('data-path', element.img);
            card.classList.add('card');
            card.onclick = function () {
                flipCard(this);
            };
            grid.appendChild(card);
        });

    }
    shuffleCards(gameCards);
    createBoard(gameCards);




    function flipCard(card) {
        if (parseInt(flipCounter) < 2) {
            //Flip card
            card.classList.add('flip', 'card-front', 'card-back');
            //Lock board when 2 cards have been flipped until unFlip runs
            //  if (flipCounter < 3); {
            //     flipCounter++;
            // }
            card.src = card.getAttribute('data-path');
            //  let cardName = card.getAttribute('data-name');
            //if(flipCounter === maxFlip){
            setTimeout(checkForMatch(card), 1000);
            // }
            // flipCount();
        }
    };

    function checkForMatch(card) {
        card.src = card.getAttribute('data-path');
        let cardName = card.getAttribute('data-name');
        console.log("current name: " + currentName);
        console.log("card name: " + cardName);
        console.log("flipcounter: " + flipCounter);
        console.log("Match card: " + matchedCards);

        flipCounter++;
        if (parseInt(flipCounter) === 1) {
            currentName = cardName;
            return;
        }
        else if (cardName === currentName) {
            flipCounter = 0;
            currentName = '';
            matchedCards.push(card);
            console.log(matchedCards);
            //check if cards do not match
            //reset flipcounter and currentName
        }
        else if (flipCounter === maxFlip && cardName !== currentName) {
            timeoutID = window.setTimeout(function () {
                // let images = document.querySelectorAll(`[data-name*="${currentName}"]`);
                // images.forEach(img => {
                //     img.src = defaultImage;
                // });
                clearTimeout(timeoutID), unFlip(currentName, cardName);
                flipCounter = 0;
                currentName = '';
                card.src = defaultImage;
            }, 3000)
        }
        // else if (parseInt(flipCounter) === parseInt(maxFlip)) {
        //     flipCounter = 0;
        //     ///check if cards match and push matched cards to array
        // };
        // unFlip(currentName, cardName);
    }


    function unFlip(PreviousCard, CurrentCard) {
        let previousCard = document.querySelectorAll(`[data-name="${PreviousCard}"]`)[0];
        let currentCard = document.querySelectorAll(`[data-name="${CurrentCard}"]`)[0];

        currentCard.setAttribute('data-name', CurrentCard);
        currentCard.setAttribute('data-path', currentCard.src);
        currentCard.setAttribute('src', defaultImage);

        previousCard.setAttribute('data-name', PreviousCard);
        previousCard.setAttribute('data-path', previousCard.src);
        previousCard.setAttribute('src', defaultImage);
    };

    (function loseGame() {
        if (matchedCards.length < gameCards.length && timeRemaining === 0) {
            gameOver;
            document.getElementsByClassName('win-overlay').style.display = 'none';
            document.getElementsByClassName('lose-overlay').style.display = 'block';
        }
        resetGame()
    })();

    (function winGame() {
        if (matchedCards.length === gameCards.length && timeRemaining > 0) {
            gameWin;
            document.getElementsByClassName('win-overlay').style.display = 'block';
            document.getElementsByClassName('lose-overlay').style.display = 'none';
        }
        resetGame();
    })();

    function resetGame() {

        shuffleCards(gameCards);
        // createBoard(gameCards);
    }
});