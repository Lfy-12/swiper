## swiper-js- 文件夹
模仿swiper网站的部分经典demo  https://www.swiper.com.cn/demo/index.html

demo文件夹中：

- default.hmtl -- 对应swiper中的【基础滑动010 + 按钮切换020 + 自定义显示器070】
- infinite-loop.hmtl -- 对应swiper中的【Loop模式/无限循环200】
- pagination-progress -- 对应swiper中的【进度条指示器050】
- effect-cube.hmtl -- 对应swiper中的【3D方块切换 230】
- effect-coverflow.html -- 待完善

## swiper-vue-component- 文件夹

针对上面的模型封装组件

#### **Swiper 切换**

- 自动轮播
- 鼠标按下拖动切换图片
- 左右箭头切换图片
- 点击dot小圆点分页器切换图片

#### **Swiper Props**   

| Prop         | Type    | Description                        | Default |
| ------------ | ------- | ---------------------------------- | ------- |
| duration     | Number  | 切换一个轮播图的过渡时间           | 300ms   |
| interval     | Number  | 轮播图切换时间间隔                 | 1700ms  |
| pagination   | String  | 分页器类型(可选值为:dot\|progress) | dot     |
| infinityLoop | Boolean | 是否循环轮播                       | false   |
| autoplay     | Boolean | 是否自动播放                       | false   |

#### **测试用例**

```vue
<Swiper pagination="dot" :infinityLoop="true" :autoplay="true">
    <SwiperItem v-for="(item, index) in arr" :key="index">
    	<img :src="item" />
    </SwiperItem>
</Swiper>
```

