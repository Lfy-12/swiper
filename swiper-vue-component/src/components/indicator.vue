<template>
    <div>
        <div class="swiper-pagination-dot" v-if="pagination=='dot'">
            <span :class="{active:circleIndex===i}" v-for="(v,i) in swiperItemCount" :key="i" @click="changeIndex(i)"></span>
        </div>

        <div class="swiper-pagination-progress" v-else>
            <div class="swiper-progress" :style="progressStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Indicator",
    
    props: {
        pagination: {  
            type: String,
            default: 'dot' 
        },
        circleIndex: {
            type: Number,
            default: 0
        },
        swiperItemCount: {
            type: Number,
            default: 0
        },
        infinityLoop: {
            type: Boolean,
            default: true,
        }
    },

    methods: {
        changeIndex(i){
            let index = i + (this.infinityLoop ? 1:0)
            this.$emit('updataIndex',index)
        }
    },

    mounted(){
        if(this.pagination == 'progress'){
            let progress = this.$el.querySelector('.swiper-progress')
            progress.style.transform = `scaleX(${1/this.swiperItemCount})`;
            progress.style.transition = 'none';
            setTimeout(() => {
                progress.style.transition = '300ms';
            }, 100);
        }
    },

    computed: {
        progressStyle() {
            return {
                transform: `scaleX(${(this.circleIndex+1)/this.swiperItemCount})`,
                'transition-duration': '300ms'
            }
        }
    }  

}
</script>

<style>
.swiper-pagination-dot {
    position: absolute;
    text-align: center;
    z-index: 99;
    bottom: 10px;
    left: 0;
    width: 100%;
}
.swiper-pagination-dot span{
    width: 10px;
    height: 10px;
    margin: 0 2px;
    display: inline-block;
    border-radius: 50%;
    background: #000;
    opacity: .5;
    cursor: pointer;
}
.active{
    background: #007aff !important;
    opacity: .8;
}
.swiper-pagination-progress{
    position: absolute;
    width: 100%;
    height: 4px;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.25);
    text-align: center;
    z-index: 10;
}
.swiper-progress{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: left top;
    background: #007aff;
}
</style>