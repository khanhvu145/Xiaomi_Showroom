// const bannerList = document.querySelectorAll('.hero__main-item');
// const pageList = document.querySelectorAll('.hero__page-number');
// const nextBtn = document.querySelector('.hero__arrow-right');
// const prevBtn = document.querySelector('.hero__arrow-left');
// var currentBanner = 0;

// setInterval(function(){
//     currentBanner++;
//     nextSlide();
// }, 10000);

// nextBtn.onclick = function(){
//     currentBanner++;
//     nextSlide();
// };

// prevBtn.onclick = function(){
//     currentBanner--;
//     prevSlide();
// };

// function nextSlide(){
//     if(currentBanner >= bannerList.length){
//         currentBanner = 0;
//     }
//     bannerList.forEach(function(banner, index){
//         if(index === currentBanner){
//             banner.classList.add('active');
//             pageList[index].classList.add('active');
//             pageList[index].innerText = "0" + (currentBanner + 1);
//         }
//         else{
//             banner.classList.remove('active');
//             pageList[index].classList.remove('active');
//             pageList[index].innerText = "";
//         }
//     })
// };

// function prevSlide(){
//     if(currentBanner < 0){
//         currentBanner = bannerList.length - 1;
//     }
//     bannerList.forEach(function(banner, index){
//         if(index === currentBanner){
//             banner.classList.add('active');
//             pageList[index].classList.add('active');
//             pageList[index].innerText = "0" + (currentBanner + 1);
//         }
//         else{
//             banner.classList.remove('active');
//             pageList[index].classList.remove('active');
//             pageList[index].innerText = "";
//         }
//     })
// };

// const slider = document.querySelector('.hero__main');
// const slides = Array.from(document.querySelectorAll('.hero__main-item'));

// let isDragging = false;
// let currentIndex = 0;
// let startPos = 0;
// let endPos = 0;

// slides.forEach((slide, index) => {
//     const slideImg = slide.querySelector('.hero__main-img');
//     slideImg.addEventListener('dragstart', (e) => e.preventDefault());

//     //Touch events
//     slide.addEventListener('touchstart', touchStart(index));
//     slide.addEventListener('touchend', touchEnd);
//     slide.addEventListener('touchmove', touchMove);

//     //Mouse events
//     slide.addEventListener('mousedown', touchStart(index));
//     slide.addEventListener('mouseup', touchEnd);
//     slide.addEventListener('mousemove', touchMove);
// })

// function touchStart(index){
//     return function(e) {
//         currentIndex = index;
//         startPos = getPositionX(e);
//         isDragging = true;
//     }
// }

// function touchEnd(e) {
//     isDragging = false;
//     if(startPos - endPos > 100 && endPos != 0){
//         currentBanner++;
//         nextSlide();
//     }
//     if(startPos - endPos < -100 && endPos != 0){
//         currentBanner--;
//         prevSlide();
//     }
//     endPos = 0;
// }

// function touchMove(e) {
//     if(isDragging) {
//         const currentPosition = getPositionX(e);
//         endPos = currentPosition;
//     }
// }

// function getPositionX(e){
//     return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
// }