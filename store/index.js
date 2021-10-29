/* eslint-disable */
import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loading: false,
      pokemonList: []
    },
    mutations: {
      setLoading: (state, vals) => {
        state.loading = vals
      },
      setPokemonList: (state, vals) => {
        state.pokemonList = vals
      }   
    },
    getters: {
      getLoading: (state) => {
        return state.loading
      },
      getPokemonList: (state) => {
        return state.pokemonList
      }
    },
    actions: {
      setPokemonListAction({ commit }) {
        commit('setLoading', true) 
        let globalPokemon = []
        let pokemon = []
        const requests = []

        axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
        .then(response => {
          pokemon = response.data.results
        })
        .finally(() => {
          pokemon.forEach(function(x) {
            requests.push(axios.get(x.url))
          })
          axios.all(requests).then(axios.spread((...responses) => {
            pokemon = responses
          }))
          .finally(() => {
            console.log(pokemon)
            pokemon.forEach(function(x) {
              globalPokemon.push({
                id: x.data.id,
                name: x.data.name,
                image: x.data.sprites.other['official-artwork']['front_default'],
                types: x.data.types,
                firstType: x.data.types[0].type.name
              })
            })
            commit('setPokemonList', globalPokemon)
            commit('setLoading', false)            
          })
        })  
      }
    }
  })
}

export default createStore
