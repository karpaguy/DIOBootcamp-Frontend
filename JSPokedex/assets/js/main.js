const pokedexArea = document.querySelector('ol#pokedex-area');

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
                    <div class="pokemon-details">
                        <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <ol class="stats">
                            <li class="stat">
                                <p>HP</p>
                                <p class="value">${pokemon.statsList[0]}</p>
                                <div class="bar"></div>
                            </li>
                            <li class="stat">
                                <p>ATK</p>
                                <p class="value">${pokemon.statsList[1]}</p>
                                <div class="bar"></div>
                            </li>
                            <li class="stat">
                                <p>DEF</p>
                                <p class="value">${pokemon.statsList[2]}</p>
                                <div class="bar"></div>
                            </li>
                            <li class="stat">
                                <p>SPA</p>
                                <p class="value">${pokemon.statsList[3]}</p>
                                <div class="bar"></div>
                            </li>
                            <li class="stat">
                                <p>SPD</p>
                                <p class="value">${pokemon.statsList[4]}</p>
                                <div class="bar"></div>
                            </li>
                            <li class="stat">
                                <p>SPE</p>
                                <p class="value">${pokemon.statsList[5]}</p>
                                <div class="bar"></div>
                            </li>
                        </ol>
                    </div>
                </li>
    `).join('')
    pokedexArea.innerHTML += newList
})
    
}

loadPokemon()