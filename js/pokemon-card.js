function renderPokemons(pokemons) {
    const pokemonContainer = document.getElementById("pokemon-container")

    pokemons.forEach(async pokemon => {
        await renderPokemon(pokemon, pokemonContainer)
    })
}

async function renderPokemon(pokemon, container) {
    pokemon = await pokemonService.getOne(pokemon.name)
    const div = document.createElement("div")
    div.classList.add("pokemon-card", "fade-in")
    div.id = pokemon.id

    div.innerHTML = `
        <span class="pkx-id">${pokemon.id}</span>
        <div class="pokemon-card-header">
            <span class="pokemon-name">${capitalizeAndSplit(pokemon.name)}</span>
            <img src="${pokemon.sprites.front_default}" class="sprite">
        </div>

        <div class="type-container">
            <span class="types-header">Types</span>
        </div>
    `
    const typeContainer = div.getElementsByClassName("type-container")[0];
    pokemon.types.forEach(async type => {
        await renderType(type.type, typeContainer)
    })

    // Find the correct position to insert the new Pokémon
    let inserted = false;
    for (let child of container.children) {
        const childId = parseInt(child.getAttribute('id'));
        if (pokemon.id < childId) {
            container.insertBefore(div, child);
            inserted = true;
            break;
        }
    }

    // If no earlier Pokémon was found, append to the end
    if (!inserted) {
        container.appendChild(div);
    }
}

async function renderType(type, container) {
    const span = document.createElement("span")
    span.textContent = capitalizeAndSplit(type.name)
    container.appendChild(span)
}