<template>
  <div id="app">
    <Swiper :infinityLoop="true" pagination="dot">
      <SwiperItem v-for="(item, index) in arr" :key="index">
          <img :src="item" />
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import Swiper  from "./components/Swiper";
import  SwiperItem  from "./components/SwiperItem.vue";

export default {
  name: 'App',
  components: {
      Swiper,
      SwiperItem
  },
  data () {
    return{
      arr: [ require('./assets/nature-1.jpg'), 
      require('./assets/nature-2.jpg'), 
      require('./assets/nature-3.jpg'),
      require('./assets/nature-4.jpg')]
    }
  }
}
</script>

<style>
#app {
    position: relative;
    height: 100%;
}
</style>
