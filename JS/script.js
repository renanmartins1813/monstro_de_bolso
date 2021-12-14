const monstros = () => {
    const pegarMonstro = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const monstrinhos = []

    for (let i = 1; i <= 898; i++) {
        monstrinhos.push(
            fetch(
                pegarMonstro(i)
            ).then(response => response.json()))
    }

    Promise.all(monstrinhos)
        .then(pokemons => {

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {

                const types = pokemon.types.map(typeInfo => typeInfo.type.name);

                accumulator += `
                    <li class="card ${types[0]}">
                        <img class="card-img" alt="${pokemon.name}" src="${pokemon.sprites.front_default}"/>
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisPokemons
        }).then( ()=>{
            const loader = document.querySelector('.loaderContainer');
            const h1 = document.querySelector('.hidden');
            h1.className = '';
            loader.className += ' hidden';
        }
        )
}

monstros()