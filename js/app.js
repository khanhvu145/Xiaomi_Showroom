const bannerList = document.querySelectorAll('.hero__main-item');
const pageList = document.querySelectorAll('.hero__page-number');
const nextBtn = document.querySelector('.hero__arrow-right');
const prevBtn = document.querySelector('.hero__arrow-left');
const searchBtn = document.querySelector('.header__control-search');
const searchInput = document.querySelector('.header__control-content');
const slides = Array.from(document.querySelectorAll('.hero__main-item'));
const header = document.querySelector('.header');
const backTopBtn = document.querySelector('.back-top-btn');
const newsList = document.querySelectorAll('.news__item');
const newsOverlay = document.querySelector('.news__overlay');
const newsVideo = document.querySelector('.news__video-iframe');
const headerOverlay = document.querySelector('.header__overlay');
const menuBtn = document.querySelector('.header__mobile-open');
const closeBtn = document.querySelector('.header__mobile-close');
const mobileNav = document.querySelector('.header__mobile-nav');
const sections = document.querySelectorAll('section[id]');
const headerNavbarItems = document.querySelectorAll('.header__nav-link');
const navTabMobItem = document.querySelectorAll('.header__mobile-link');

var isAppear = false;
let isDragging = false;
let currentIndex = 0;
let startPos = 0;
let endPos = 0;

const app = {
    currentBanner: 0,
    videos_news: [
        {
            url: 'https://www.youtube.com/embed/Egy_mt8YCD0'
        },
        {
            url: 'https://www.youtube.com/embed/KSL9L-Xy_RE'
        },
        {
            url: 'https://www.youtube.com/embed/R-IoQKq4Tyw'
        },
    ],

    handleEvents: function () {
        //Xử lý chuyển slide mỗi 10s
        setInterval(function(){
            app.currentBanner++;
            app.nextSlide();
        }, 10000);

        //Xử lý click nút next
        nextBtn.onclick = function(){
            app.currentBanner++;
            app.nextSlide();
        };
        
        //Xử lý click nút prev
        prevBtn.onclick = function(){
            app.currentBanner--;
            app.prevSlide();
        };

        //Xử lý nút search
        searchBtn.onclick = function() {
            isAppear = !isAppear;
            if(isAppear) {
                searchInput.style.display = 'flex';
            }
            else{
                searchInput.style.display = 'none';
            }
        };

        //Xử lý kéo slide
        slides.forEach(function(slide, index) {
            const slideImg = slide.querySelector('.hero__main-img');
            slideImg.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });

            //Touch events
            slide.addEventListener('touchstart', app.touchStart(index));
            slide.addEventListener('touchend', app.touchEnd);
            slide.addEventListener('touchmove', app.touchMove);

            //Mouse events
            slide.addEventListener('mousedown', app.touchStart(index));
            slide.addEventListener('mouseup', app.touchEnd);
            slide.addEventListener('mousemove', app.touchMove);
        });

        //Xử lý header
        window.addEventListener('scroll', function() {
            const offset = window.pageYOffset;
            if(offset > screen.availHeight - 150) {
                header.classList.add('scroll');
                backTopBtn.classList.add('active');
            }
            else{
                header.classList.remove('scroll');
                backTopBtn.classList.remove('active');
            }
            app.scrollToSection();
        })
        
        //Xử lý click nút back top
        backTopBtn.onclick = function(){
            document.body.scrollTop = 0; //Safari
            document.documentElement.scrollTop = 0;  //Chrome, Firefox, IE and Opera
        }
        
        //Xử lý click xem video
        newsList.forEach(function(news, index){
            news.onclick = function(){
                newsOverlay.classList.add('active');
                newsVideo.setAttribute('src', app.videos_news[index].url);
            }
        })

        //Xử lý click vào news__overlay
        newsOverlay.onclick = function(){
            newsOverlay.classList.remove('active');
            newsVideo.setAttribute('src', '');
        }

        //Xử lý click vào button menu
        menuBtn.onclick = function(){
            headerOverlay.style.display = 'block';
            mobileNav.style.transform = 'translateX(0px)';
            mobileNav.style.opacity = 1;
            
        }
        //Xử lý click button close 
        closeBtn.onclick = function(){
            headerOverlay.style.display = 'none';
            mobileNav.style.transform = 'translateX(100%)';
            mobileNav.style.opacity = 0;
        }
        //Xử lý click vào overlay 
        headerOverlay.onclick = function(){
            headerOverlay.style.display = 'none';
            mobileNav.style.transform = 'translateX(100%)';
            mobileNav.style.opacity = 0;
        }

        //Xử lý thanh menu khi scroll
        // window.addEventListener('scroll', function(){
        //     app.scrollToSection();
        // })
    },

    nextSlide: function(){
        if(app.currentBanner >= bannerList.length){
            app.currentBanner = 0;
        }
        bannerList.forEach(function(banner, index){
            if(index === app.currentBanner){
                banner.classList.add('active');
                pageList[index].classList.add('active');
                pageList[index].innerText = "0" + (app.currentBanner + 1);
            }
            else{
                banner.classList.remove('active');
                pageList[index].classList.remove('active');
                pageList[index].innerText = "";
            }
        })
    },
    
    prevSlide: function(){
        if(app.currentBanner < 0){
            app.currentBanner = bannerList.length - 1;
        }
        bannerList.forEach(function(banner, index){
            if(index === app.currentBanner){
                banner.classList.add('active');
                pageList[index].classList.add('active');
                pageList[index].innerText = "0" + (app.currentBanner + 1);
            }
            else{
                banner.classList.remove('active');
                pageList[index].classList.remove('active');
                pageList[index].innerText = "";
            }
        })
    },

    touchStart: function(index){
        return function(e) {
            currentIndex = index;
            startPos = app.getPositionX(e);
            isDragging = true;
        }
    },
    
    touchEnd: function(e) {
        isDragging = false;
        if(startPos - endPos > 100 && endPos != 0){
            app.currentBanner++;
            app.nextSlide();
        }
        if(startPos - endPos < -100 && endPos != 0){
            app.currentBanner--;
            app.prevSlide();
        }
        endPos = 0;
    },
    
    touchMove: function(e) {
        if(isDragging) {
            const currentPosition = app.getPositionX(e);
            endPos = currentPosition;
        }
    },
    
    getPositionX: function(e){
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    },

    closeNavTabMob: function(){
        headerOverlay.style.display = 'none';
        mobileNav.style.opacity = '0';
        mobileNav.style.transform = 'translateX(100%)';
    }, 

    //Hàm xử lý click menu
    scrollToSection: function(){
        let current = '';
        sections.forEach(function(section){
            const sectionTop = section.offsetTop;
            const sectionHeigh = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeigh / 5)){
                current = section.getAttribute('id');
            }
        })
        
        headerNavbarItems.forEach(function(item){
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`){
                item.classList.add('active');
            }
        })

        navTabMobItem.forEach(function(item){
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`){
                item.classList.add('active');
            }
            item.onclick = function(){
                app.closeNavTabMob();
            }
        })
    },

    start: function(){
        this.handleEvents();
    }
}

app.start();
