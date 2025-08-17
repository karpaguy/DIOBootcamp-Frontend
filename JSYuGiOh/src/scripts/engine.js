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
    playerSides:{
        player1: "player-cards",
        player1BOX: document.querySelector(".card-box.framed#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector(".card-box.framed#computer-cards"),
    },
    fieldCards:{
        player: document.querySelector("#player-field-card"),
        computer: document.querySelector("#computer-field-card")
    },
    actions:{
        button: document.querySelector("#next-duel")
    }
};



const pathImages = "./src/assets/icons/"
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
        type: "Scissor",
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

    if(fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", () => {
            drawSelectedCard(IdCard);
        })
    }

    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImages()

    let computerCardId = await getRandomCardId();

    await ShowHiddenCardFieldsImages(true)
    await hiddenCardSDetails()

    await drawCardInField(cardId, computerCardId)
    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawCardInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function ShowHiddenCardFieldsImages(value) {
    if (value == true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }

    if (value == false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardSDetails() {
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.cardSprites.avatar.src = ""
}

async function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function checkDuelResults(cardId, computerCardId) {
    let duelResults = "DRAW"
    let playerCard = cardData[cardId]

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "WIN";
        state.score.playerScore++;
    } else if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "LOSE";
        state.score.computerScore++;
    }
    
    await playAudio(duelResults)
    return duelResults;
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    init()
}

async function removeAllCardsImages() {
    let {computerBOX, player1BOX} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove())

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

async function drawSelectedCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}

async function updateScore() {
    let { computerScore, playerScore } = state.score
    state.score.scoreBox.innerText = `Win: ${playerScore} | Lose: ${computerScore}`
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        
        document.querySelector(`#${fieldSide}`).appendChild(cardImage)
    }
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        audio.play();
    } catch {}
}

function init() {
    ShowHiddenCardFieldsImages(false)
    
    drawCards(5, state.playerSides.player1)
    drawCards(5, state.playerSides.computer)
}

init()