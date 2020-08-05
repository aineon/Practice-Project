const maxFlip = 2,
      defaultImage = 'assets/images/ireland.jpg',
      cardList = [
          {
            name: 'boat',
            img: 'assets/images/bunnagee.jpg'
        },
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
            name: 'lighthouse',
            img: 'assets/images/lighthouse.jpg'
        },
        {
            name: 'mountains',
            img: 'assets/images/mountains.jpg'
        },
        {
            name: 'arranmore',
            img: 'assets/images/arranmore.jpg'
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
            name: 'tay',
            img: 'assets/images/lough_tay.jpg'
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
            name: 'gougane',
            img: 'assets/images/gougane_barra.jpg'
        },
        {
            name: 'bective',
            img: 'assets/images/bective.jpg'
        },
        {
            name: 'kerry',
            img: 'assets/images/kerry.jpg'
        },
        {
            name: 'letterfrack',
            img: 'assets/images/cliff.jpg'
        },
        {
            name: 'lake',
            img: 'assets/images/lake.jpg'
        }   
    ];

function shuffleCards(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

    let easyGame = cardList.slice(0, 6).concat(cardList.slice(0, 6));
    let mediumGame = cardList.slice(0, 12).concat(cardList.slice(0, 12));
    let hardGame = cardList.concat(cardList);

let timeoutID,
    currentName = '',
    flipCounter = 0,
    matchedCards = [];
function loadGame(difficulty) {
    // easy, medium, hard
    switch (difficulty.toLowerCase()) {
        case 'easy':
            createBoard(easyGame);
            break;
        case 'medium':
            createBoard(mediumGame);
            break;
        case 'hard':
            createBoard(hardGame);
            break;
        default:
            break;
    }
    shuffleCards(hardGame)
}; 
function flipCard(card) {
    // Flip card
    flipCounter += 1;
    card.src = card.getAttribute('data-path');
    let cardName = card.getAttribute('data-name');
    if (parseInt(flipCounter) === 1) {
        currentName = cardName;
    }
    else if (cardName === currentName) {
        // We have a match, reset flipCounter and CurrentName
        flipCounter = 0;
        currentName = '';
        matchedCards.push(card);
        console.log(matchedCards)
    } else if (flipCounter === maxFlip && cardName !== currentName) {
        // We do not have a match
        timeoutID = window.setTimeout(function () {
            let images = document.querySelectorAll(`[data-name*="${currentName}"]`);
            images.forEach(img => {
                img.src = defaultImage;
            });
            flipCounter = 0;
            currentName = '';
            card.src = defaultImage;
            clearTimeout(timeoutID);
        }, 1500)
    }
};


 

function createBoard(cardList) {
    const grid = document.getElementById('grid');
    // Reset Grid contents.
    grid.innerHTML = '';
    cardList.forEach(element => {
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