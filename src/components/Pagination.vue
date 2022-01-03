<template>
  <div class="container">
     <div class="row">
        <div class="pagination">
          <a class="pages"
            v-for="n in paginationSize" :key="n"
            v-on:click="paginationClick"
          >
            {{n}}
          </a>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  data: () => {
    return {
      paginationSize:0,
    };
  },
  computed: {
    ...mapState(["products",]),
    ...mapGetters(["products"].map(() => {})),
  },
  methods: {
    paginationClick(event){
      this.$store.dispatch("getMoviesFromPagination",{paginationValue: event.currentTarget.innerHTML});
    }
  },
  watch: {
    products(){
      let findTotalResult = Math.round(this.products.totalResults / 10) ;
      return this.paginationSize = findTotalResult;
    },
  },
};
</script>

<style scoped>
.pagination {
  margin: 0 auto;
  justify-content: center;
  box-sizing: border-box;
  white-space: normal;
  display: block;
}
.pagination .pages {
  padding: 1em;
  display: inline-block;
  cursor: pointer;
  background: rgb(199, 202, 241);
  color: #000;
  margin: 0.3em 1em;
  font-size:12px;
  border-radius: 7px;
  width: 50px;
  text-align: center;
  text-decoration: none;
}
</style>