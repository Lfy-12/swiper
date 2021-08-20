window.onload = function(){

    let container = document.querySelector('.swiper-container');
    let wrapper = document.querySelector('.swiper-wrapper');
    let slide = document.querySelectorAll('.swiper-slide');
    let button_prev = document.querySelector('.swiper-button-prev')
    let button_next = document.querySelector('.swiper-button-next')
    let dotBox = document.querySelector('.swiper-pagination')
    let dots = dotBox.children;
    let width = slide[0].offsetWidth;
    let index = 0;

    // 根据图片张数 动态渲染小圆点
    for(let i=0;i<slide.length;i++){
        const span = document.createElement('span');
        dotBox.append(span)
    }
    dots[0].className = 'active';

    // 页面渲染时，图片为第一张，左箭头按钮失效
    button_prev.style.color = 'grey';
    button_prev.disabled = true;

    // 鼠标滑动，切换图片
    wrapper.addEventListener('mousedown',function(event){
        let start = wrapper.offsetLeft;
        // 【鼠标在盒子内的坐标】
        let innerX = event.pageX - start;
        let start1 = event.pageX;
        // 节流阀 当鼠标移动move时 才触发'鼠标抬起 切换图片'事件
        let flag = false;
        event.preventDefault();
    
        document.addEventListener('mousemove',moveFunc);
        document.addEventListener('mouseup',cancelMove); 

        function moveFunc(event){
            flag = true;
            let step = event.pageX - innerX;
            if(index == 0 && step >= 500){
                step = 500;
            }else if(index == slide.length-1 && step <= -width*slide.length+800){
                step = -width*slide.length+800;
            }
            wrapper.style.left = step + 'px';
        }
        function cancelMove(event){
            document.removeEventListener('mousemove',moveFunc);
            if(flag){
                flag = false;
                let moveX = wrapper.offsetLeft - start;
                index += moveX < 0 ? 1 : -1;
                if(index == -1) index =0;
                if(index == slide.length) index = slide.length -1;
                aimation(wrapper,-index * width);
            }
            // document.removeEventListener('mouseup',cancelMove);
        }
    })

    // 左右箭头切换图片
    button_prev.addEventListener('click',function(){
        aimation(wrapper,-(--index) * width);
    })
    button_next.addEventListener('click',function(){
        aimation(wrapper,-(++index) * width);
    })

    // 点击小圆点切换相应的图片
    for(let i=0;i<dots.length;i++){
        dots[i].addEventListener('click',function(){
            index = i;
            aimation(wrapper,-(index) * width);
        })
    }
    
    // 事件代理
    container.addEventListener('click',function(){
        // 图片切换到第一张或者最后一张，左/右箭头样式改变，并且按钮失效
        if(index == 0){
            button_prev.style.color = 'grey';
            button_prev.disabled = true;
        }else if(index == slide.length-1){
            button_next.style.color = 'grey';
            button_next.disabled = true;
        }else{
            button_prev.style.color = 'skyblue';
            button_prev.disabled = false;
            button_next.style.color = 'skyblue';
            button_next.disabled = false;
        }

        // 小圆点样式动态变化
        for(let i=0;i<dots.length;i++){
            dots[i].className = ''
        }
        dots[index].className = 'active'
    })
}