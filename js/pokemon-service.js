class PokemonService {

    constructor() {
        this.pokemonRepository = new Repository("pokemon")
    }

    async getAll() {
        return await this.pokemonRepository.getAll()
    }

    async getOne(name) {
        return await this.pokemonRepository.getOne(name)
    }

}