const { query } = require('express')
const {databaseConnection} = require('./connection')


async function salvarPokemons (pokemon) {
    const result = await databaseConnection('pokemons').insert({
        nome: `${pokemon.nome}`,
        tipo: `${pokemon.tipo}`,
        fraqueza: `${pokemon.fraqueza}`,
        resistencia: `${pokemon.resistencia}`
    })
        
    if(result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            hp: pokemon.hp,
            id: result[0]
        }
    } else {
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon (id) {
    const result = await databaseConnection('pokemons').where({id}).select()
    
    return result[0]
   
}

async function mostrarPokemons () {
    const result = await databaseConnection('pokemons').select()
    
    return result
   
}

async function atualizarPokemon (id,pokemon) {

    const updatePokemon = {
        nome: pokemon.nome,
        tipo: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia,
        hp: pokemon.hp
    }
    const result = await databaseConnection('pokemons').where({ id }).update(updatePokemon)
    
    if(result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            hp: pokemon.hp,
            id
        }
    } else {
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function deletarPokemon (id) {
    const result = await databaseConnection('pokemons').where({id}).del()
    return result
}

async function batalhaPokemon(id1, id2) {

    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = await mostrarPokemon(id1)
    const pokemon2 = await mostrarPokemon(id2)

    if (pokemon1.hp == 0 || pokemon2.hp == 0){
        return 'Pokemons desmaiados não podem batalhar!'
    } else {
        if(pokemon1.hp != 0 && pokemon2.hp != 0) {

            if(pokemon1.tipo == pokemon2.fraqueza) {
                pokemon2.hp = pokemon2.hp - superEfetivo
            } else if(pokemon1.tipo == pokemon2.resistencia) {
                pokemon2.hp = pokemon2.hp - naoEfetivo
            } else {
                pokemon2.hp = pokemon2.hp - efetivo
            }
        }
    
        if(pokemon1.hp != 0 && pokemon2.hp != 0) {
    
            if(pokemon2.tipo == pokemon1.fraqueza) {
                pokemon1.hp = pokemon1.hp - superEfetivo
            } else if(pokemon2.tipo == pokemon1.resistencia) {
                pokemon1.hp = pokemon1.hp - naoEfetivo
            } else {
                pokemon1.hp = pokemon1.hp - efetivo
            }
        }
    
        if(pokemon1.hp < 0) pokemon1.hp = 0
        if(pokemon2.hp < 0) pokemon2.hp = 0
    
        await databaseConnection('pokemons').where({id: id1}).update({hp: parseInt(`${pokemon1.hp}`)})
        await databaseConnection('pokemons').where({id: id2}).update({hp: parseInt(`${pokemon2.hp}`)})
    
        if(pokemon1.hp > 0 && pokemon2.hp <= 0) {
            return `${pokemon2.nome} desmaiou. Vitória de ${pokemon1.nome}!`
        }
    
        else if(pokemon2.hp > 0 && pokemon1.hp <= 0) {
            return `${pokemon1.nome} desmaiou. Vitória de ${pokemon2.nome}!`
        } else
        return `${pokemon1.nome}: ${pokemon1.hp} HP sobrando / ${pokemon2.nome}: ${pokemon2.hp} HP sobrando`
    }

    
}

async function potion (id) {
    pokemon = await mostrarPokemon(id)

    if(pokemon.hp > 0){
    pokemon.hp += 20
    if(pokemon.hp > 100) pokemon.hp = 100
    await databaseConnection('pokemons').where({id}).update({hp: parseInt(`${pokemon.hp}`)})
    return `${pokemon.nome} recuperou 20 de HP! Seu HP agora é de ${pokemon.hp}!`
    } else return `${pokemon.nome} está desmaiado! Não foi possível usar Poção!`
}

async function revive (id) {
    pokemon = await mostrarPokemon(id)

    if(pokemon.hp > 0) {
        return `${pokemon.nome} não desmaiou para precisar de Reviver!`
    }
    else if (pokemon.hp <= 0) {
        pokemon.hp += 10
        await databaseConnection('pokemons').where({id}).update({hp: parseInt(`${pokemon.hp}`)})
        return `${pokemon.nome} reviveu com ${pokemon.hp} de HP!`
    }
}

module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, potion, revive}