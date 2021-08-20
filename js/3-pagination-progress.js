window.onload = function(){
    let container = document.querySelector('.swiper-container');
    let wrapper = document.querySelector('.swiper-wrapper');
    let slide = wrapper.children;
    let button_prev = document.querySelector('.swiper-button-prev');
    let button_next = document.querySelector('.swiper-button-next');
    let width = slide[0].offsetWidth;
    let index = 0;

    let progress = document.querySelector('.swiper-progress')

    // 页面初始渲染时,左箭头按钮失效,进度条进度为1
    button_prev.style.color = 'grey';
    button_prev.disabled = true; 
    progress.style.transform = `scaleX(${1/slide.length})`;
    progress.style.transition = 'none';

    // 鼠标滑动，切换图片
    wrapper.addEventListener('mousedown',function(event){
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
            let step = event.pageX - start;
            if(index == 0 && step >= 500){
                step = 500;
            }
            if(index == slide.length-1 && -index*width+step <= -width*(slide.length-1)-500){
                step = -500;
            }
            wrapper.style.transform = `translateX(${-index*width+step}px)`;
            wrapper.style.transition = 'none';
        }
        function cancelMove(event){
            document.removeEventListener('mousemove',moveFunc);
            if(flag){
                flag = false;
                let moveX = event.pageX - start;
                index += moveX < 0 ? 1 : -1;
                if(index == -1){
                    index =0;
                }
                else if(index == slide.length){
                    index = slide.length -1;
                }
                trans();            
            }
        }
    })

    // 左右箭头切换图片
    button_prev.addEventListener('click',function(){
        index -= 1;
        trans();
    })
    button_next.addEventListener('click',function(){
       index += 1;
       trans();
    })

    function trans(){
        wrapper.style.transform = `translateX(${-index * width}px)`;
        wrapper.style.transition = 'all 0.3s';
        progress.style.transform = `scaleX(${(index+1)/slide.length})`;
        progress.style.transition = 'all 0.3s';
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
            button_prev.style.color = '#007aff';
            button_prev.disabled = false;
            button_next.style.color = '#007aff';
            button_next.disabled = false;
        }
    })

}