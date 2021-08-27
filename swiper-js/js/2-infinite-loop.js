window.onload = function(){

    let wrapper = document.querySelector('.swiper-wrapper');
    let slide = wrapper.children;
    let button_prev = document.querySelector('.swiper-button-prev');
    let button_next = document.querySelector('.swiper-button-next');
    let dotBox = document.querySelector('.swiper-pagination');
    let dots = dotBox.children;
    let width = slide[0].offsetWidth;
    let picFlag = true;
    let index = 1;
    let circle = 0;

    // 根据图片张数 动态渲染小圆点
    for(let i=0;i<slide.length;i++){
        const span = document.createElement('span');
        dotBox.append(span)
    }
    dots[0].className = 'active';

    // 克隆图片
    let clone_slide = slide[slide.length-1].cloneNode(true);
    wrapper.insertBefore(clone_slide,slide[0])
    clone_slide = slide[1].cloneNode(true);
    wrapper.append(clone_slide);
    // 显示源代码中的第一张图片
    wrapper.style.left = -width * 1 + 'px';
    
    // 鼠标滑动，切换图片
    wrapper.addEventListener('mousedown',function(event){
        let start = wrapper.offsetLeft;
        // 【鼠标在盒子内的坐标】
        let innerX = event.pageX - start;
        // 节流阀 当鼠标移动move时 才触发'鼠标抬起 切换图片'事件
        let flag = false;
        event.preventDefault();
    
        document.addEventListener('mousemove',moveFunc);
        document.addEventListener('mouseup',cancelMove); 

        function moveFunc(event){
            flag = true;
            wrapper.style.left = event.pageX - innerX + 'px';
        }
        function cancelMove(event){
            document.removeEventListener('mousemove',moveFunc);
            if(flag){
                flag = false;
                if(picFlag){
                    let moveX = wrapper.offsetLeft - start;
                    index += moveX < 0 ? 1 : -1;
                    loop();
                }
            }
        }
    })

    // 左右箭头切换图片
    button_prev.addEventListener('click',function(){
        if(picFlag){
            --index;
            loop();
        }
    })
    button_next.addEventListener('click',function(){
        if(picFlag){
            ++index;
            loop();
        }
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
        picFlag = false;
        aimation(wrapper,-index * width,function(){
            picFlag = true;
            if(index == slide.length-1){
                index = 1;
                wrapper.style.left = -width *index+ 'px';
            }else if(index == 0){
                index = slide.length-2;
                wrapper.style.left = -width *index+ 'px';
            }
            circle = index-1;
            for(let i=0;i<dots.length;i++){
                dots[i].className = '';
            }
            dots[circle].className = 'active';
        });
    }

}