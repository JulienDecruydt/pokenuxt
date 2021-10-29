<template>
  <main :class="darkMode === true ? 'dark' : ''">
    <div class="dark:bg-gray-900">
      <header class="flex items-center justify-between lg:gap-40 md:gap-24 bg-white border-b-2 p-5 dark:bg-gray-800 dark:text-white">
        <h1 class="text-xl font-bold">PokéNuxt</h1>
        <div class="fixed bottom-0 left-0 w-screen bg-white dark:bg-gray-800 z-20 md:relative flex flex-grow">
          <span class="z-10 h-full leading-snug font-normal absolute text-center absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3 dark:text-blueGray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blueGray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input type="text" placeholder="Search Pokemon..." class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white dark:bg-gray-800 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
        </div>
        <div class="dark__mode">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            v-on:click="darkMode = !darkMode">
            <path class="duration-300" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="darkMode === true ? moon : sun" />
          </svg>
        </div>
      </header>
      <div class="grid gap-2 grid-cols-2 md:grid-cols-3 p-2.5 pb-12" v-if="!getLoading">
        <div class="pokemon relative text-white bg-gray-100 rounded-lg py-1.5 px-2.5" :class="p.firstType" v-for="p in getPokemonList" v-bind:key="p.id">
          <h2 class="relative z-10 capitalize font-bold">{{ p.name }}</h2>
          <div class="absolute top-px right-2.5 text-4xl text-gray-700 opacity-10 z-0 font-bold">{{ formatedIndex(p.id) }}</div>
          <div class="flex items-center">
            <div class="w-4/12">
              <div class="type text-xs rounded-3xl w-min mt-1 py-1 px-2.5 capitalize" v-for="(t, i) in p.types" v-bind:key="i" style="box-shadow: inset 0px 0px 20px rgb(255 255 255 / 30%);">
                {{ t.type.name }}
              </div>
            </div>
            <div class="flex justify-center w-8/12">
              <img class="h-20" :src="p.image">
            </div>
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      darkMode: true,
      sun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      moon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    }
  },
  computed: {
    ...mapGetters([
      'getPokemonList',
      'getLoading'
    ])
  },
  methods: {
    ...mapActions([
      'setPokemonListAction'
    ]),
    formatedIndex (index) {
      if (index < 10) {
        return '#00' + String(index)
      }
      if (index >= 10 && index < 100) {
        return '#0' + String(index)
      }
      if (index >= 100) {
        return '#' + String(index)
      }
    }
  },
  created () {
    this.setPokemonListAction()
  }
}
</script>
<style lang="scss">
  main {
    .dark__mode {
      svg {
        cursor: pointer;
      }
    }
    input {
      outline: 0;
    }
    .pokemon {
      animation: enter .4s cubic-bezier(.5, 0, .5, 1) backwards;
      @keyframes enter {
        from {
          opacity: 0;
          transform: translateY(2rem) scale(0.6);
        }
      }
      &.grass {
        background: #44c9a9;
      }
      &.fire {
        background: #F86B6B;
      }
      &.water {
        background: #72B8F6;
      }
      &.bug {
        background: #94C28C;
      }
      &.normal {
        background: #BFC1C8;
      }
      &.poison {
        background: #7D4A85;
      }
      &.electric {
        background: #FFDE0A;
      }
      &.ground {
        background: #E6B137;
      }
      &.rock {
        background: #916137;
      }
      &.fairy {
        background: #E2ADE9;
      }
      &.fighting {
        background: #C78340;
      }
      &.psychic {
        background: #EDB0FF;
      }
      &.ghost {
        background: #3B2C40;
      }
      &.ice {
        background: #ABE0EB;
      }
      &.dragon {
        background: #4B65CC;
      }
    }
  }
</style>
