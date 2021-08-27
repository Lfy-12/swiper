<template>
  <div class="swiper-slide">
    <!-- 放置图片ing -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Slide"
};
</script>

<style>
.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;

    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
}
</style>

