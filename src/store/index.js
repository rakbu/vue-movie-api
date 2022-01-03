import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: { 
    //uygulama içerisindeki kullanılacak olan veriler (tanımlar array,obje v.b)
    paginationValue:'',
    products: [],
    searchPage:'1',
    apiKeyOnStart: 'http://www.omdbapi.com/?apikey=9da49ce5&s=batman&plot=full&page=',
    apiKeyOnSearch: 'http://www.omdbapi.com/?apikey=9da49ce5&plot=full&s=',
  },
  actions:{
    //dispatch ile tetiklenir.
    //actions'tan mutations'a commit yardımıyla gönderiyoruz.
    //actions'u spesifik olarak çalıştırmak için yapmak gereken işlem methods içerisinde dispatch fonksiyonunu çağırmak
    getBySearch ({ commit }, {inputSearchData}) {
      console.log('this state searchKey');
      commit('SET_SEARCH_VALUE',inputSearchData);
      console.log(inputSearchData);
      axios.get(this.state.apiKeyOnSearch + this.state.searchKey).then(r => r.data).then(result => {
        console.log(result);
        if(result.Response){
          commit('GET_MOVIE_ONSEARCH_AND_PAGINATION',result);
        }
      });
    },
    getMoviesInitial ({ commit }) {
      axios.get(this.state.apiKeyOnStart + this.searchPage).then(response => response.data).then(result => {
        console.log(result)
        commit('GET_MOVIE_INITIAL',result);
      });
    },
    getMoviesFromPagination ({commit}, {paginationValue}){
      commit('SET_PAGINATION_VALUE',paginationValue);
      console.log('paginationValue');
      console.log(this.state.searchPage);
      axios.get(this.state.apiKeyOnStart + this.state.searchPage).then(response => response.data).then(result => {
        console.log(result)
        commit('GET_MOVIE_ONSEARCH_AND_PAGINATION',result);
      });
    },
  },
  mutations:{
    //commit ile tetiklenir .vue dosyasında çağırılmalı.
    //ön tarafta data değiştirme ve gönderme işlemi olacağı için  method içerisinde çalışmalı.
    //ön tarafta parametre gönderilmek isteniyorsa event içerisinden parantez açılıp parametre gönderilebilir.
    //mutation ve state her zaman senkron çalışır.
    GET_MOVIE_INITIAL(state, items) {
      state.products = items;
    },
    GET_MOVIE_ONSEARCH_AND_PAGINATION(state, items) {
      state.products = [];
      state.products = items;
    },
    SET_SEARCH_VALUE(state,value){
      state.searchKey = value;
    },
    SET_PAGINATION_VALUE(state,value){
      state.searchPage = value;
    },
  },
  getters:{
    //data return edeceği için mutlaka fonksiyon olur. parametre state olmalı
    //mapGetters bir arraydir aşağıdaki fonksiyon adlarını alır. kaç tane olursa olsun hepsini yazmak yerine array içerisine yazarak işlemi kısaltırız. Bize obje olarak değer döndürür.
    responseSearchValue: (state) => {
      return state.products;
    },
  }
})
