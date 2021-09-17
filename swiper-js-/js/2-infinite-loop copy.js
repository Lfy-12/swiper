window.onload = function(){
    // 获取节点
    let wrapper = document.querySelector('.swiper-wrapper');
    let slide = wrapper.children;
    let button_prev = document.querySelector('.swiper-button-prev');
    let button_next = document.querySelector('.swiper-button-next');
    let dotBox = document.querySelector('.swiper-pagination');
    let dots = dotBox.children;
    // 轮播图图片的宽度
    let width = slide[0].offsetWidth;
    // 节流阀
    let index = 1;
    let circle = 0;

    // 根据图片张数 动态渲染小圆点
    for(let i=0;i<slide.length;i++){
        const span = document.createElement('span');
        dotBox.append(span)
    }
    dots[0].className = 'active';

    // 【！！先动态渲染小圆点，再克隆图片】

    // 克隆图片
    let clone_slide = slide[slide.length-1].cloneNode(true);
    wrapper.insertBefore(clone_slide,slide[0])
    clone_slide = slide[1].cloneNode(true);
    wrapper.append(clone_slide);
    // 显示源代码中的第一张图片
    wrapper.style.transform = `translateX(${-width}px)`;
    wrapper.style.transition = 'none';

    // 左右箭头切换图片
    button_prev.addEventListener('click',function(){
      --index;
      loop();
    })
    button_next.addEventListener('click',function(){
      ++index;
      loop();
    })

    // 点击小圆点切换相应的图片
    for(let i=0;i<dots.length;i++){
        dots[i].addEventListener('click',function(){
            circle = i;
            index = i + 1;
            loop();
        })
    }

    function loop(){
      console.log(index)
      wrapper.style.transform = `translateX(${-width*index}px)`;
      wrapper.style.transition = 'all 0.3s';
      setTimeout(()=>{
        if(index == slide.length-1){
          index = 1;
          wrapper.style.transform = `translateX(${-width*index}px)`;
          wrapper.style.transition = 'none';
        }else if(index == 0){
            index = slide.length-2;
            wrapper.style.transform = `translateX(${-width*index}px)`;
            wrapper.style.transition = 'none';
        }
        circle = index-1;
        for(let i=0;i<dots.length;i++){
            dots[i].className = '';
        }
        dots[circle].className = 'active';
      },300)
    }

}