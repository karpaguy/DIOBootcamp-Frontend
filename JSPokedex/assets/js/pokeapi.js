const POKEAPI = {}

function convertDetailToPokemon(detail) {
    // Gera uma nova lista com isso.
    // https://pokeapi.co/api/v2/pokemon/1/.
    // console.log(detail)
    const types = detail.types.map( (typeSlot) => typeSlot.type.name );
    // const statsList = [['HP'], ['ATK'], ['DEF'], ['SPA'], ['SPD'], ['SPE']]

    statsList = detail.stats.map( (statSlot) =>  statSlot);
    console.log(statsList)
    const pokemon = new Pokemon(detail.id, 
        detail.name,
        detail.types[0],    
        types,
        statsList,
        detail.sprites.front_default
    )
    return pokemon;
    
}

POKEAPI.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then( (response) => response.json() )
    .then(convertDetailToPokemon)
}

POKEAPI.fetchPokemon = async (offset, limit = 8) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then( (response) => response.json() )
    .then( (jsonBody) => jsonBody.results )
    .then( (pokemons) => pokemons.map(POKEAPI.getPokemonDetails))
    .then( (detailRequests) => Promise.all(detailRequests))
    .then( (pokemonDetails) => (pokemonDetails) )
} 