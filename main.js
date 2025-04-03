const pokemonService = new PokemonService()

window.onload = async ()=> {
    const pokemons = await pokemonService.getAll()
    renderPokemons(pokemons)
}

