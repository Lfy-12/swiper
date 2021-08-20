window.onload = function(){

    let container = document.querySelector('.swiper-container');
    let wrapper = document.querySelector('.swiper-wrapper');
    let slide = wrapper.children;
    let dotBox = document.querySelector('.swiper-pagination')
    let dots = dotBox.children;
    let zIndex = 1;

    // 初始化图片的3D角度
    for(let i=0;i<slide.length;i++){
        slide[i].style.transform = `rotateX(0deg) rotateY(${-50*i}deg) translate3d(0px,0px,${-100*i}px) scale(1)`;
        slide[i].style.zIndex = zIndex--;
    }
    wrapper.style.transform = 'translate3d(500px,0px,0px)';

    // 小圆点
    // for(let i=0;i<slide.length;i++){
    //     const span = document.createElement('span');
    //     dotBox.append(span)
    // }
    // dots[0].className = 'active';


}