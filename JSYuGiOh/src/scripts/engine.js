/* Inicialização do Jogo, seja ao entrar ou em caso de reset. */
const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.querySelector("#score_points")
    },
    cardSprites:{
        avatar: document.querySelector("#card-image"),
        name: document.querySelector("#card-name"),
        type: document.querySelector("#card-type")
    },
    fieldCards:{
        player: document.querySelector("#player-field-card"),
        computer: document.querySelector("#computer-field-card")
    },
    actions:{
        button: document.querySelector("#next-duel")
    }
};

const playerSides = {
    player1: "player-field-card",
    computer: "computer-field-card"
}

const pathImages = ".src/assets/icons/"
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2]
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0]
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1]
    }
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${pathImages}card-back.png`);
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardData.getAttribute("data-id"));
        });
    }

    cardImage.addEventListener("mouseover", () => {
        drawSelectedCard(IdCard);
    })

    return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
    
        console.log(fieldSide)
        document.querySelector(`#${fieldSide}`).appendChild(cardImage)
    }
}

function init() {
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}

init()