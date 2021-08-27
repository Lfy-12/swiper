<template>
  <div class="swiper-container" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="swiper-wrapper" :style="wrapperStyle" @mousedown="mouseDown">
      <!-- 插入swiper-item -->
      <slot></slot>
    </div>

    <div v-show="btnVisible">
      <button class="swiper-button-prev" @click="index--">&lt;</button>
      <button class="swiper-button-next" @click="index++">&gt;</button>
    </div>
    
    <swiper-indicator :pagination="pagination" 
    :circleIndex="circleIndex" 
    :swiperItemCount="swiperItemCount" 
    :infinityLoop="infinityLoop"
    @updataIndex="index=$event">
    </swiper-indicator>
  </div>
</template>

<script>
import SwiperIndicator from './indicator.vue'

export default {
  name: "Swiper",
  components: {
    SwiperIndicator
  },
  props: {
    // 轮播图切换时间间隔
    duration: {
      type: Number,
      default: 300
    },
    // 切换一个轮播图的过渡时间
    interval: {
      type: Number,
      default: 1700
    },
    // 显示器类型
    pagination: {  
      type: String,
      default: 'dot' 
    },
    // 是否无缝轮播
    infinityLoop: {
      type: Boolean,
      default: true
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      swiperItemCount: 0,  //轮播图数目
      imgWidth: 0, //swiper每张图片的宽度一样
      index: 0,  //当前轮播索引的下标
      circleIndex: 0,  //显示器的索引值
      reversing: false,  //动画是否有过渡效果
      step: 0,  //鼠标按下移动的步长
      btnVisible: false
    };
  },

  methods: {
    // 鼠标按下拖动图片
    mouseDown(event){
      let that = this;
      // 鼠标按下时的初始位置
      let start = event.pageX;
      // 节流阀 当鼠标移动move时 才触发'鼠标抬起 切换图片'功能
      let flag = false;
      event.preventDefault();
  
      document.addEventListener('mousemove',moveFunc);
      document.addEventListener('mouseup',cancelMove); 
      
      function moveFunc(event){
        flag = true;
        // 鼠标移动的步长
        that.step = event.pageX - start;
        if(that.infinityLoop == false){
          if(that.index == 0 && that.step >= 500){
            that.step = 500;
          }
          if(that.index == that.swiperItemCount-1 && -that.index*that.imgWidth+that.step <= -that.imgWidth*(that.swiperItemCount-1)-500){
            that.step = -500;
          }
        }
        that.reversing = true;
      }

      function cancelMove(event){
        document.removeEventListener('mousemove',moveFunc);
        if(flag){
          flag = false;
          let moveX = event.pageX - start;
          that.index += moveX < 0 ? 1 : -1;
          that.reversing = false
          that.step = 0
          if(that.index == -1 && that.infinityLoop == false){
            that.index = 0;
          }
          else if(that.index == that.swiperItemCount && that.infinityLoop == false){
            that.index = that.swiperItemCount -1;
          }
        }
      }

    },
    play() {
      this.timer = setInterval(() => {
        this.index++
      }, this.interval);
    },
    pause() {
      clearInterval(this.timer)
    },
    mouseEnter() {
      this.autoplay && this.pause()
      this.btnVisible = true
    },
    mouseLeave() {
      this.autoplay && this.play()
      this.btnVisible = false
    }

  },

  mounted() {
    let swiperEle = document.querySelector('.swiper-wrapper')
    let slide = swiperEle.children;
    this.swiperItemCount = slide.length;
    this.imgWidth = slide[0].offsetWidth;
    this.btnLeft = this.$el.children[1].children[0];
    this.btnRight = this.$el.children[1].children[1];
    if(this.infinityLoop){
      // 复制第一张和最后一张图片
      swiperEle.appendChild(slide[0].cloneNode(true))
      swiperEle.insertBefore(slide[this.swiperItemCount-1].cloneNode(true), slide[0])
      this.index = 1
      this.reversing = true
      setTimeout(() => {
        this.reversing = false
      }, 100);
    }else{
      this.$el.children[1].style.color = 'grey';
      this.$el.children[1].disabled = true;
    }
    if(this.autoplay){
      this.play();
    }
  },

  watch: {
    // 监测index更新并处理相关操作，同步更新circleIndex
    index(newIndex) {
      // 处于轮播的两端时 按钮失效
      if(!this.infinityLoop){
        this.circleIndex = this.index;
        if(this.index == 0){
          this.btnLeft.style.color = 'grey';
          this.btnLeft.disabled = true;
          this.btnRight.style.color = '#007aff';
          this.btnRight.disabled = false;
        }else if(this.index == this.swiperItemCount-1){
          this.btnLeft.style.color = '#007aff';
          this.btnLeft.disabled = false;
          this.btnRight.style.color = 'grey';
          this.btnRight.disabled = true;
        }else{
          this.btnLeft.style.color = '#007aff';
          this.btnLeft.disabled = false;
          this.btnRight.style.color = '#007aff';
          this.btnRight.disabled = false;
        }
      }
      // 无缝轮播
      else{
        this.circleIndex = this.index - 1
        if (newIndex === this.scrollItemCount - 1) {
          this.circleIndex = 0
          setTimeout(() => {
            this.reversing = true
            this.index = 1
            setTimeout(() => {
              this.reversing = false
            }, 100)
          }, this.duration)
        } else if (newIndex === 0) {
          this.circleIndex = this.swiperItemCount - 1
          setTimeout(() => {
            this.reversing = true
            this.index = this.scrollItemCount - 2
            setTimeout(() => {
              this.reversing = false
            }, 100)
          }, this.duration)
        }
      }
    }
  },

  computed: {
    // 样式--轮播图的滑动
    wrapperStyle() {
      return {
        transform: `translateX(${-this.index * this.imgWidth}px)`,
        'transition-duration': this.reversing ? '0ms' : `${this.duration}ms`
      }
    },
    // 无缝轮播时 轮播的实际张数
    scrollItemCount() {
      return this.swiperItemCount+2
    }
  }  
};
</script>

<style>
.swiper-container {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
}
.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
}
.swiper-button-prev,.swiper-button-next{
    position: absolute;
    top: 50%;
    font-size: 50px;
    color: #007aff;
    cursor: pointer;
    z-index: 99;
    border: none;
    background-color:rgba(255, 255, 255, 0);
}
.swiper-button-next{
    left: 97.5%;
}
</style>


