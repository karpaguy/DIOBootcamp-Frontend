const pokedexArea = document.querySelector('ol#pokedex-area');

const statAbbreviations = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SPA",
    "special-defense": "SPD",
    speed: "SPE"
}
const limit = 5;
let offset = 0;

function loadPokemon(offset, limit) {
    POKEAPI.fetchPokemon(offset, limit).then( (pokemonList = []) => {
        console.log(pokemonList)
        const newList = pokemonList.map( (pokemon) => 
        `<li class="pokemon">
            <div class="pokemon-id">
                <p class="number">${pokemon.number}</p>
                <p class="name">${pokemon.name}</p>
            </div>
            <div class="sprite-area">
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-details ${pokemon.types[0]}">
                <ol class="types">
                ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <ol class="stats">
                ${pokemon.statsList.map(statSlot => {
                    let bkgColor;
                    const name = statAbbreviations[statSlot.stat.name.toLowerCase()]
                    const statInt = parseInt(statSlot.base_stat)
                    const valuePercentage = `${(statInt / 255) * 100}%`

                    if (statInt < 30) {
                        bkgColor = "veryLow-value"
                    }
                    else if (statInt < 60) {
                        bkgColor = "low-value"
                    }
                    else if (statInt < 90) {
                        bkgColor = "medium-value"
                    }
                    else if (statInt < 130) {
                        bkgColor = "high-value"
                    }
                    else if (statInt < 160) {
                        bkgColor = "veryHigh-value"
                    } else {
                        bkgColor = "super-value"
                    }
                    return `
                    <li class="stat">
                    <p>${name}</p>
                    <p class="value">${statSlot.base_stat}</p>
                    <div style="width: ${valuePercentage}" class="bar ${bkgColor}"></div>
                    </li>`}).join('')}
                </ol>   
            </div>
        </li>`).join('')
    pokedexArea.innerHTML += newList
})
    
}

loadPokemon()