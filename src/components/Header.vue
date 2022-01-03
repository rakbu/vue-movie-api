<template>
  <header id="header" class="header">
      <div class="container">
        <h3 class="search_title">VUE CLI MOVIE API <span class="small">(OMDb)</span></h3>
        <input
          type="text"
          class="search"
          placeholder="Search a movie"
          @keyup="setInputValue($event.target.value), checkLoading($event.target.value)"
        />
      </div>
    <div v-if="isLoading">loading</div>
  </header>
</template>
<script>
let debounce = require('debounce')
import {mapGetters} from 'vuex'
import store from "../store/index";
//methods üzerinden vuex'e değer gönderilir.
export default {
  data: function () {
    return {
      items:'',
      inputSearchData:'',
      isLoading:false
    };
  },
  computed:{
    ...mapGetters['responseSearchValue'],
  },
  methods:{
    setInputValue: debounce((value) =>{
      store.dispatch('getBySearch',{inputSearchData: value});
     }, 2000),
     
  }
};
</script>

<style scoped lang="css" src="../assets/less/header.css"></style>