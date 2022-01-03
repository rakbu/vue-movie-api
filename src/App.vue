<template>
  <div id="app">
    <Header />
    <Movies />
    <Pagination />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Movies from './components/Movies.vue'
import Pagination from './components/Pagination.vue'

export default {
  name: 'App',
  components: {
    Header,
    Movies,
    Pagination
  }
}
</script>
