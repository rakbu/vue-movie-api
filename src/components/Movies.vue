<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="block">
          We found {{ products.totalResults }} similiar movie or series on this
          search, but developer used free key. Thats why we have only 10 results
          here :)<br />
          But dont worry you can use pagination.
        </div>
      </div>

      <div class="row">
        <div
          class="item col-12 col-md-3"
          v-for="item in products.Search"
          v-bind:key="item.Poster"
        >
          <picture>
            <source media="(min-width:768px)" :srcset="item.Poster" v-if="item.Poster != 'N/A'" />
            <source media="(max-width:768px)" :srcset="item.Poster" v-if="item.Poster !='N/A'" />
            <img v-if="item.Poster != 'N/A'" :src="item.Poster"  alt="item.Title" class="img-fluid" />
            <img v-if="item.Poster === 'N/A'" src="http://placehold.it/300x444"  alt="item.Title" class="img-fluid" />
          </picture>
          <div class="details">
            <h3><b>Title: </b> {{ item.Title }}</h3>
            <p><b>Release Year: </b>{{ item.Year }}</p>
            <p><b>Type: </b>{{ item.Type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

//v-model="value" computed içerisindeki value objesi oluşturulur ve get(){ vuex.gelenData } set(value) tanımlanır. Bu tanımlar hem datayı setler hem de güncellenen datayı çeker

//computed ile data bastırılır,
//getters ile store'daki güncel data çekilir.
export default {
  data: () => {
    return {
      item: "",
    };
  },
  created() {
    this.$store.dispatch("getMoviesInitial");
  },
  computed: {
    // computed ile sadece data çekim işlemleri yapılır.
    // this.$store.dispatch('getMoviesInitial');
    ...mapState([
      // state.products içerisindeki değere artık this.products diyerek erişebiliyoruz.
      "products",
    ]),
    ...mapGetters(
      ["products"].map(() => {
      })
    ),
  },
  methods: {
    //methods içerisinde input v.b asenkron datalar setlenir.
  },
  watch: {
    // buradan değişen herhangi bir durumda; mapState ile çekilen field izlenebilir "products" olarak array çekilmiş
  },
};
</script>
<style scoped>
.block {
  margin: 2em auto;
  padding: 3em;
  background: rgb(199, 202, 241);
}
.item {
  position: relative;
  margin-bottom: 2em;
}
.item img {
  width: 100%;
  max-height: 445px;
}
.item .details {
  box-sizing: border-box;
  border: 1px solid #000;
  padding: 0px 0.3em;
}
.item .details h3,
.item .details p {
  margin: 0.3em auto;
  font-size: 14px;
}
.item .details h3 {
  font-size: 16px;
}
.item .details b {
  font-weight: bold;
}
</style>