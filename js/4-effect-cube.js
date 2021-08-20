window.onload = function(){

    let container = document.querySelector('.swiper-container');
    let wrapper = document.querySelector('.swiper-wrapper');
    let slide = wrapper.children;
    let dotBox = document.querySelector('.swiper-pagination')
    let dots = dotBox.children;
    let index = 0;

    // 初始化图片的3D角度
    for(let i=0;i<slide.length;i++){

        let round = Math.floor( i * 90 / 360);
        let swiperSize = container.offsetWidth;

        let tx = 0;
        let tz = 0;
        if (i % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
        } else if ((i - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
        } else if ((i - 2) % 4 === 0) {
            tx = swiperSize + round * 4 * swiperSize;
            tz = swiperSize;
        } else if ((i - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = 3 * swiperSize + swiperSize * 4 * round;
        }

        slide[i].style.transform = `rotateY(${90*i}deg) translate3d(${tx}px,0px,${tz}px)` ;
    }

    // 小圆点
    for(let i=0;i<slide.length;i++){
        const span = document.createElement('span');
        dotBox.append(span)
    }
    dots[0].className = 'active';

    // 层级
    slide[0].style.zIndex = 2;
    slide[1].style.zIndex = 2;

    // 鼠标滑动，切换图片
    wrapper.addEventListener('mousedown',function(event){
        let start = event.pageX 
        // 节流阀 当鼠标移动move时 才触发'鼠标抬起 切换图片'事件
        let flag = false;
        event.preventDefault();
    
        document.addEventListener('mousemove',moveFunc);
        document.addEventListener('mouseup',cancelMove); 

        function moveFunc(event){
            flag = true;
            let step = event.pageX - start;
            if(index == 0 && step > 0){
                step = 0;
            }else if(index == slide.length-1 && step < 0){
                step = 0;
            }
            if(Math.abs(step)>60){
                document.removeEventListener('mousemove',moveFunc);
            }
            wrapper.style.transform = `rotateY(${-90*index + step}deg)`;
            wrapper.style.transition = '0.5s';
        }
        function cancelMove(event){
            document.removeEventListener('mousemove',moveFunc);
            if(flag){
                flag = false;
                let moveX = event.pageX - start;
                index += moveX < 0 ? 1 : -1;
                if(index == -1) index =0;
                if(index == slide.length) index = slide.length -1;
                wrapper.style.transform = `rotateY(${-90*index}deg)`;
                wrapper.style.transition = '1s';
                
                for(let v of slide){
                    v.style.zIndex = 1;
                }
                if(index == 0){
                    slide[index+1].style.zIndex = 2;
                }else if(index == slide.length -1){
                    slide[index-1].style.zIndex = 2;
                }else{
                    slide[index-1].style.zIndex = 2;
                    slide[index+1].style.zIndex = 2;
                }
                slide[index].style.zIndex = 2;

                for(let i=0;i<dots.length;i++){
                    dots[i].className = ''
                }
                dots[index].className = 'active'
            }
        }
    })
}