//Arquivo de referência para a API Pokemon. Queries em SQL.
const { query } = require('express')
const {databaseConnection} = require('./connection')


async function salvarPokemons (pokemon) {
    const queryInsertPokemon = `INSERT INTO pokemons(nome, tipo, fraqueza, resistencia) VALUES ('${pokemon.nome}', '${pokemon.tipo}', '${pokemon.fraqueza}', '${pokemon.resistencia}')`
    const result = await databaseConnection.raw(queryInsertPokemon)
    
    if(result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            hp: pokemon.hp,
            id: result[0].insertId
        }
    } else {
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
}

async function mostrarPokemon (id) {
    const querySelectPokemon = `SELECT * FROM pokemons WHERE id = ${id}`
    const result = await databaseConnection.raw(querySelectPokemon)

    return result[0]
   
}

async function mostrarPokemons () {
    const querySelectPokemon = `SELECT * FROM pokemons`
    const result = await databaseConnection.raw(querySelectPokemon)

    return result[0]
   
}

async function atualizarPokemon (id,pokemon) {
    const queryUpdatePokemon = `UPDATE pokemons SET nome = '${pokemon.nome}', tipo = '${pokemon.tipo}', fraqueza = '${pokemon.fraqueza}', resistencia = '${pokemon.resistencia}' WHERE id = ${id}`
    const result = await databaseConnection.raw(queryUpdatePokemon)

    if(result) {
        return {
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            hp: pokemon.hp,
            id: parseInt(`${id}`)
        }
    } else {
        console.error("Deu erro!")
        return {
            error: "Deu erro na inserção"
        }
    }
    //pokemons[id] = pokemon
    //return pokemon
}

/*NÃO ESTÃO PREPARADAS PARA O BANCO DE DADOS

function deletarPokemon (id) {
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id , 1)
    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

function batalhaPokemon(id1, id2) {

    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

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

    if(pokemon1.hp > 0 && pokemon2.hp <= 0) {
        return `${pokemon2.nome} desmaiou. Vitória de ${pokemon1.nome}!`
    }

    else if(pokemon2.hp > 0 && pokemon1.hp <= 0) {
        return `${pokemon1.nome} desmaiou. Vitória de ${pokemon2.nome}!`
    } else
    return `${pokemon1.nome}: ${pokemon1.hp} HP sobrando / ${pokemon2.nome}: ${pokemon2.hp} HP sobrando`
}

function potion (id) {

    if(pokemons[id].hp > 0){
    pokemons[id].hp = pokemons[id].hp + 20
    if(pokemons[id].hp > 100) pokemons[id].hp = 100
    return `${pokemons[id].nome} recuperou 20 de HP! Seu HP agora é de ${pokemons[id].hp}!`
    } else return `${pokemons[id].nome} está desmaiado! Não foi possível usar Poção!`
}

function revive (id) {

    if(pokemons[id].hp > 0) {
        return `${pokemons[id].nome} não desmaiou para precisar de Reviver!`
    }
    else if (pokemons[id].hp <= 0) {
        pokemons[id].hp = pokemons[id].hp + 10
        return `${pokemons[id].nome} reviveu com ${pokemons[id].hp} de HP!`
    }
}

*/

module.exports = {salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon/*, deletarPokemon, batalhaPokemon, potion, revive*/}