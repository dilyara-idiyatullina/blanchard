window.addEventListener('DOMContentLoaded', function() {

    // переменные для свайперов
    let slidesPerViewGallery = 6;
    let slidesPerViewPublications = 3;
    let pageNumberGallery = 1;
    let pageNumberPublications = 1;
    let pagesCountGallery;
    let pagesCountPublications;
    let datesListColumnLength = 9;
    let modulo = 0;

    let burger = document.querySelector('.nav-burger');
    let menuBurger = document.querySelector('.nav-wrapper');
    
    // выпадающее меню
    let activeSubMenuLink = null;
    let activeddmenu = '';
    let ddmenuDiv = null;

    let myMap;

    // contacts - карта
    // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    try {
        ymaps.ready(init);
    } catch {
        console.log('Карта не загрузилась (');
    }
    
    function init(){
        // Создание карты.
        myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            //center: [55.75720204375996,37.64243749999998],
            center: [55.760220568958395,37.61855149999991],

            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14,
        });
                    
        var myPlacemark = new ymaps.Placemark([55.75846306898368,37.601079499999905], {}, {
            iconLayout: 'default#image',
            iconImageHref: '/img/marker.svg',
            iconImageSize: [20, 20],
            iconImageOffset: [-3, -42],
        });
        
        // Размещение геообъекта на карте.

        myMap.geoObjects.add(myPlacemark);

    };
    
    // свайпер hero

    // свайпер hero - вариант с переключением кадров
    // let heroSwiper = new Swiper('.hero__slider', {
    //     // Optional parameters
    //     loop: true,
    //     autoplay: {
    //         delay: 3000,
    //     },
    //     effect: 'fade',
    //     fadeEffect: {
    //       crossFade: true
    //     },
    // }); 


    // свайпер projects
    let partnersSwiper = new Swiper('.partners__slider', {

        loop: true,
        loopFillGroupWithBlank: false,
        slidesOffsetBefore: 0,
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,

        breakpoints: {
            180: {
                slidesPerGroup: 1,
                slidesPerView: 1,
            },
            500: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 34,
            },
            850: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 50,
            },              
            1200: {
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 50,              
            }
        },

        navigation: {
            nextEl: '.partners__switch--next',
            prevEl: '.partners__switch--prev',
        },
        
        speed: 800,

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        a11y: {
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}',
        },

    }); 
    

    // свайпер gallery
    let gallerySwiperOptions = {

        // slidesPerColumn: 2,
        // slidesPerGroup: 2,
        // slidesPerView: 2,
        // spaceBetween: 34,

        breakpoints: {
            180: {
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                slidesPerView: 'auto',
                spaceBetween: 0
            },
            501: {
                slidesPerColumn: 2,
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 34
            },
            1200: {
                slidesPerColumn: 2,
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 50              
            },
        },

        navigation: {
            nextEl: '.gallery__switch--next',
            prevEl: '.gallery__switch--prev',
        },
        
        speed: 800,

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        a11y: {
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}',
        },

    };

    let gallerySwiperOptionsOnMobile = {

        slidesPerColumn: 1,
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 0,

        navigation: {
            nextEl: '.gallery__switch--next',
            prevEl: '.gallery__switch--prev',
        },
        
        speed: 800,

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        a11y: {
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}',
        },

    };

    let gallerySwiper = new Swiper('.gallery__slider', gallerySwiperOptions);

    let realIndexGallery = gallerySwiper.realIndex;    

    let galleryHandler = function () {    

        if (realIndexGallery >= gallerySwiper.realIndex) {
            pageNumberGallery = pageNumberGallery - 1; 
        } else {
            pageNumberGallery = pageNumberGallery + 1;
        }
        realIndexGallery = gallerySwiper.realIndex;
        
        document.querySelector('.gallery__pages').innerText = pageNumberGallery + " / " + pagesCountGallery;

    };

    // свайпер publications
    let publicationsSwiperOptions = {

        slidesPerView: 2,
        spaceBetween: 0,

        breakpoints: {
            180: {
                slidesPerView: 2,
                spaceBetween: 0,
            },        
            501: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 38,
            },
            1200: {
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 50              
            }
        },

        navigation: {
            nextEl: '.publications__switch--next',
            prevEl: '.publications__switch--prev',
        },
        
        speed: 800,

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        a11y: {
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}',
        },

    };

    let publicationsSwiper = new Swiper('.publications__slider', publicationsSwiperOptions); 

    let realIndexPublications = publicationsSwiper.realIndex;

    let publicationsHandler = function () {

        realIndexPublications = publicationsSwiper.realIndex;

        floor = Math.floor(publicationsSwiper.slides.length / slidesPerViewPublications);
        modulo = publicationsSwiper.slides.length % slidesPerViewPublications;

        lastSlideRealIndex = (floor - 1) * slidesPerViewPublications + modulo;

        switch (realIndexPublications) {
            case 0:
                pageNumberPublications = 1;
                break;
            case lastSlideRealIndex:
                pageNumberPublications = pagesCountPublications;
                break;                    
            default:
                pageNumberPublications = Math.floor(realIndexPublications / slidesPerViewPublications) + 1;
        }

        document.querySelector('.publications__pages').innerText = pageNumberPublications + " / " + pagesCountPublications;

    }; 
    
    
    // свайпер events
    let eventsSwiperOptions = {

        // spaceBetween: 22,

        pagination: {
            el: '.events-pagination',
            type: 'bullets',
        },
        
        speed: 800,

        keyboard: {
            enabled: true,
        },

        a11y: {
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
            paginationBulletMessage: 'Перейти к слайду {{index}}',
        }
    }

    let eventsSwiper = new Swiper('.events__list', eventsSwiperOptions);
    
    // скролл для выпадающего меню
    new SimpleBar(document.getElementById('customScrollReal'), { 
        autoHide: false,
        scrollbarMaxSize: 28, 
    });
    new SimpleBar(document.getElementById('customScrollImpr'), { 
        autoHide: false,
        scrollbarMaxSize: 28, 
    });
    new SimpleBar(document.getElementById('customScrollPostimpr'), { 
        autoHide: false,
        scrollbarMaxSize: 28, 
    });
    new SimpleBar(document.getElementById('customScrollAvang'), { 
        autoHide: false,
        scrollbarMaxSize: 28, 
    });
    new SimpleBar(document.getElementById('customScrollFutur'), { 
        autoHide: false,
        scrollbarMaxSize: 28, 
    });

    // переменные каталога
    let activeCountry = 'italy';
    let activePainterNum = 12;

    // catalog 

    let painters = [ 
        { id: 1, country:'italy', century: 15, name: 'Бенедетто ди Биндо', dates: '1401 - 1466.', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 2, country:'italy', century: 15, name: 'Бергоньоне, Амброджо', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'},
        { id: 3, country:'italy', century: 15, name: 'Биссоло, Франческо', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 4, country:'italy', century: 15, name: 'Больтраффио, Джованни', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 5, country:'italy', century: 15, name: 'Бонсиньори, Франческо', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 6, country:'italy', century: 15, name: 'Боттичини, Рафаэлло', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 7, country:'italy', century: 15, name: 'Брамантино', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 8, country:'italy', century: 15, name: 'Бреа, Людовико', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 9, country:'italy', century: 15, name: 'Бьяджо д’Антонио Туччи', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 10, country:'italy', century: 15, name: 'Веккьетта', dates: '', portret: 'img/Vecchietta.jpg', descr: 'dsdcds'}, 
        { id: 11, country:'italy', century: 15, name: 'Андреа Верроккьо', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 12, country:'italy', century: 15, name: 'Доменико Гирландайо', dates: '2 июня 1448 - 11 января 1494.', portret: 'img/domeniko.jpg', descr: 'Один из ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в течение года овладевал профессиональными навыками. Автор фресковых циклов, в которых выпукло, со всевозможными подробностями показана домашняя жизнь библейских персонажей (в их роли выступают знатные граждане Флоренции в костюмах того времени).'},
        { id: 13, country:'italy', century: 15, name: 'Беноццо Гоццоли', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 14, country:'italy', century: 15, name: 'Граначчи, Франческо', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 15, country:'italy', century: 15, name: 'Грегорио ди Чекко', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 16, country:'italy', century: 15, name: 'Джованни да Удине', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 17, country:'italy', century: 15, name: 'Джованни ди Паоло', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 18, country:'italy', century: 15, name: 'Джорджоне', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 19, country:'italy', century: 15, name: 'Парентино, Бернардо', dates: 'img/no_foto.png', portret: '', descr: 'dsdcds'}, 
        { id: 20, country:'italy', century: 15, name: 'Пезеллино', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 21, country:'italy', century: 15, name: 'Пьетро Перуджино', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 22, country:'italy', century: 15, name: 'Перуцци, Бальдассаре', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 23, country:'italy', century: 15, name: 'Пизанелло', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 24, country:'italy', century: 15, name: 'Пинтуриккьо', dates: '', portret: 'img/no_foto.png', descr: 'dsdcds'}, 
        { id: 1, country:'russia', century: 15, name: 'Андрей Рублёв', dates: 'около 1360 — 17 октября 1428.', portret: 'img/rublev.jpg', descr: 'Русский иконописец московской школы иконописи, книжной и монументальной живописи XV века.'}, 
    ];

    let activePainters = painters.filter(item => item.country === activeCountry);


    // Публикации. При клике на Категории открывается весь список чекбоксов

    function checkListToggle() {
        document.querySelectorAll('.check-list-item').forEach(function(checkList) {

            if (document.querySelector('.checkbox-container-header__active') != null) {               
                checkList.style.display = "block";        
            } else {
                if (!checkList.querySelector('.custom-checkbox').checked)
                checkList.style.display = "none";
            }
            
        })  
    }  

    let toggleClass = function(event) {
        document.querySelector('.checkbox-container-header__arrow-down').classList.toggle('checkbox-container-header__active');
        checkListToggle();
    }

    function toggleCross(labelCrossClasses) {

        document.querySelectorAll(labelCrossClasses).forEach(function(checkbox) {
            checkbox.addEventListener('click', function(event) {

                let clickElement = (labelCrossClasses == '.label-for-checkbox') ? checkbox.previousElementSibling : checkbox.previousElementSibling.previousElementSibling;
    
                if (clickElement.checked) {
                    if (labelCrossClasses == '.checkbox-btn-close') {
                        clickElement.checked = false;
                    }
                    checkbox.parentNode.lastElementChild.classList.remove('checkbox-btn-close--visible');

                    if (document.querySelector('.checkbox-container-header__active') === null) {
                        checkbox.parentNode.style.display = "none";
                    }
                } else {
                    checkbox.parentNode.lastElementChild.classList.add('checkbox-btn-close--visible');
                }
            })
            
        }) 

    }

    toggleCross('.label-for-checkbox');
    toggleCross('.checkbox-btn-close');


    onWindowResize();

    
    // открытие мобильного меню
    burger.addEventListener('click', function(event) {
        event.preventDefault();
        menuBurger.classList.add('open');
    })

    // закрытие мобильного меню
    document.querySelector('.log-in').addEventListener('click', function(event) {
        event.preventDefault();
        if (document.querySelector('.open') != null) {
            menuBurger.classList.remove('open');        
        }
    })

    // убираем outline с поля поиска при вводе текста
    document.querySelector('.search-input').oninput = function(event) {
        document.querySelector('.search-input').classList.add('no-outline');
        document.querySelector('.search-form__icon').classList.add('light-violet-icon');
    }
    document.querySelector('.search-input').onchange = function(event) {
        document.querySelector('.search-input').classList.remove('no-outline');
        document.querySelector('.search-form__icon').classList.remove('light-violet-icon');
    }



    document.querySelectorAll('.sub-menu__link').forEach(function(menuItem) {
        menuItem.addEventListener('click', function(event) {

            event.preventDefault();
            let ddmenuName = menuItem.dataset.ddlink;

            if (document.querySelector('.is-active-dd') != null && activeddmenu != ddmenuName  &&  activeddmenu != '') {
                toggleMenu(activeSubMenuLink);                
            }

            toggleMenu(menuItem);

            // активируем для фокуса ссылки нового меню для навигации с клавиатуры
            document.querySelector(`[data-ddmenu="${ddmenuName}"]`).querySelectorAll('ul li .drop-down-menu__link').forEach(function(ddmenuItem) {
                ddmenuItem.tabIndex = 0;           
            });

            // деактивируем для фокуса ссылки старого меню для навигации с клавиатуры
            if (activeddmenu != '') {
                document.querySelector(`[data-ddmenu="${activeddmenu}"]`).querySelectorAll('ul li .drop-down-menu__link').forEach(function(ddmenuItem) {
                    ddmenuItem.tabIndex = -1;           
                });
            } 
            
            activeSubMenuLink = menuItem;
            activeddmenu = ddmenuName;        

        })
    })  

    // закрываем меню при потере фокуса и сбрасываем фокус у его пунктов
    document.addEventListener('click', e => {

        let target = e.target;

        if (activeddmenu != '') {
            ddmenuDiv = document.querySelector(`[data-ddmenu="${activeddmenu}"]`);
    
            let its_menu = target == ddmenuDiv || ddmenuDiv.contains(target);

            let its_menuLink = target == activeSubMenuLink;

            let menu_is_active = activeSubMenuLink.classList.contains('sub-menu__link--active');

            if (!its_menu && !its_menuLink && menu_is_active) {
                toggleMenu(activeSubMenuLink);
                document.querySelector(`[data-ddmenu="${activeddmenu}"]`).querySelectorAll('ul li .drop-down-menu__link').forEach(function(ddmenuItem) {
                    ddmenuItem.tabIndex = -1;           
                });
            }

        }
    })  


    function toggleMenu(menuItem) {

        let ddmenuName = menuItem.dataset.ddlink;
        document.querySelector(`[data-ddmenu="${ddmenuName}"]`).classList.toggle('is-active-dd');
        menuItem.parentNode.querySelector('.drop-down-menu').classList.toggle('is-active-ddm');
        menuItem.classList.toggle('sub-menu__link--active');
        menuItem.querySelector('.sub-menu__icon--arrow-down').classList.toggle('sub-menu__icon--active');

    }


    // Подписка на рассылку плавно уводит к карте
    document.querySelector('.btn').addEventListener('click', function(event) {

        event.preventDefault();
        // заменить на анимацию на js
        $("html, body").animate({scrollTop: document.querySelector('#contacts').offsetTop}, 800);

    })


    function destroySwiper(swiperObj, swiperName) {

        if (swiperObj !== undefined) {
            swiperObj.destroy(true, false);
        }

        document.querySelector(swiperName).querySelector('.swiper-wrapper').style.transform = 'none';
    }

    
    function onWindowResize() {

        document.querySelector('.event:nth-child(3)').classList.add('display-none');
        document.querySelector('.event:nth-child(4)').classList.add('display-none');
        document.querySelector('.event:nth-child(5)').classList.add('display-none');

        if (document.body.clientWidth > 1200) {

            slidesPerViewGallery = 6;
            slidesPerViewPublications = 3;             
            datesListColumnLength = 9;

            if (document.querySelector('.display-none') != null) {
                document.querySelector('.event:nth-child(3)').classList.remove('display-none');
            }


        } else if ((document.body.clientWidth <= 1200)  &&  (document.body.clientWidth > 850)) {

            slidesPerViewGallery = 4;
            slidesPerViewPublications = 2;              
            datesListColumnLength = 12;

            if (document.querySelector('.display-none') != null) {
                document.querySelector('.event:nth-child(3)').classList.remove('display-none');
            }

        } else if ((document.body.clientWidth <= 850)  &&  (document.body.clientWidth > 500)) {

            slidesPerViewGallery = 4;
            slidesPerViewPublications = 2;              
            datesListColumnLength = 9;

            if (document.querySelector('.display-none') != null) {
                document.querySelector('.event:nth-child(3)').classList.add('display-none');
            }

        } else {

            slidesPerViewGallery = 1;
            datesListColumnLength = 24;


            if (document.querySelector('.display-none') != null) {
                document.querySelectorAll('.display-none').forEach(function(event) {
                    event.classList.remove('display-none');
                })
            }
            
        }    
        

        if (document.body.clientWidth > 500) {

            if (document.querySelector('.checkbox-container-header__active') === null) {
                document.querySelector('.checkbox-container-header__arrow-down').classList.add('checkbox-container-header__active');
                checkListToggle();
            }
            document.querySelector('.checkbox-container-header').removeEventListener('click', toggleClass);

            destroySwiper(eventsSwiper, '.events__list');

            if (document.querySelector('.display-none') != null) {
                document.querySelector('.events__btn').style.display = "block";
            }
            document.querySelector('.events__list .swiper-wrapper').style.flexWrap = 'wrap';

            
            gallerySwiper.destroy(true, true);
            gallerySwiper = new Swiper('.gallery__slider', gallerySwiperOptions);
            pageNumberGallery = 1;            
            gallerySwiper.on('realIndexChange', galleryHandler);
            gallerySwiper.init();
            gallerySwiper.update();

            if (publicationsSwiper.destroyed) {
                
                publicationsSwiper = new Swiper('.publications__slider', publicationsSwiperOptions);
                pageNumberPublications = 1;
                realIndexPublications = publicationsSwiper.realIndex;
                document.querySelector('.publications__slider .swiper-wrapper').style.flexWrap = 'nowrap';
                
            };
            
            publicationsSwiper.on('realIndexChange', publicationsHandler);

        } else {

            if (document.querySelector('.checkbox-container-header__active') != null) {
                document.querySelector('.checkbox-container-header__arrow-down').classList.remove('checkbox-container-header__active');
            }
            checkListToggle();
            document.querySelector('.checkbox-container-header').addEventListener('click', toggleClass);

            if (eventsSwiper.destroyed) {
                
                eventsSwiper = new Swiper('.events__list', eventsSwiperOptions);
                document.querySelector('.events__list .swiper-wrapper').style.flexWrap = 'nowrap';
                document.querySelector('.events__btn').style.display = "none";

            };

            gallerySwiper.destroy(true, true);
            gallerySwiper = new Swiper('.gallery__slider', gallerySwiperOptionsOnMobile);
            pageNumberGallery = 1;
            gallerySwiper.on('realIndexChange', galleryHandler);
            gallerySwiper.init();
            gallerySwiper.update();

            publicationsSwiper.update();

            publicationsSwiper.off('realIndexChange', publicationsHandler);
            destroySwiper(publicationsSwiper, '.publications__slider');
             
            document.querySelector('.publications__slider .swiper-wrapper').style.flexWrap = 'wrap';

        }

        realIndexGallery = gallerySwiper.realIndex;
        pagesCountGallery = Math.ceil(gallerySwiper.slides.length / slidesPerViewGallery);
        document.querySelector('.gallery__pages').innerText = pageNumberGallery + " / " + pagesCountGallery;


        if (!publicationsSwiper.destroyed) {
            
            realIndexPublications = publicationsSwiper.realIndex;
            pagesCountPublications = Math.ceil(publicationsSwiper.slides.length / slidesPerViewPublications);
            document.querySelector('.publications__pages').innerText = pageNumberPublications + " / " + pagesCountPublications;    

        }


        slidesPerViewPublicationsPrev = slidesPerViewPublications;

        // очистка дивов 
        document.querySelectorAll('.dates__list-column').forEach(function(listColumn) {
            listColumn.remove();
        });

        showPaintersList(activeCountry, activePainterNum);
        showPainterInfo(activePainterNum);

    }

    window.addEventListener("resize", function() {  // orientationchange
        onWindowResize();     
    }, false);


    function showPaintersList(countryName, painterNum) {

        activePainters = painters.filter(item => item.country === countryName);

        // цикл по аккордеону с веками    
        if (activePainters.length > 0) {

            document.querySelectorAll('.dates__list').forEach(function(nodeDatesList) {

                let activePaintersCentury = activePainters.filter(item => item.century == nodeDatesList.dataset.century);
                if (activePaintersCentury.length < 3) {
                    nodeDatesList.style.height = '70px';   
                } else if (activePaintersCentury.length > datesListColumnLength) {
                   nodeDatesList.style.height = parseInt(32 * datesListColumnLength + 57) + 'px'; ;
                } else {
                    nodeDatesList.style.height = parseInt(32 * activePaintersCentury.length + 38) + 'px'; 
                }
                
                let i = 1;
                let div = document.createElement('div');
                div.className = "dates__list-column";

                for (let painter of activePaintersCentury) {

                    if (i == painterNum) {
                        div.innerHTML = div.innerHTML + '<li class="dates__list-item"><a class="dates__link  dates__link--active" data-pid="' + painter.id + '" href="#">' + painter.name + '</a></li>';
                    } else {
                        div.innerHTML = div.innerHTML + '<li class="dates__list-item"><a class="dates__link" data-pid="' + painter.id + '" href="#">' + painter.name + '</a></li>';
                    }

                    if ((i % datesListColumnLength == 0) && (i != activePaintersCentury.length)) {
                        nodeDatesList.append(div);
                        div = document.createElement('div');
                        div.className = "dates__list-column";
                    }

                    i++;
                }

                if (activePaintersCentury.length < 3) {
                    div.style.height = '70px';   
                } else if (activePaintersCentury.length > datesListColumnLength) {
                    div.style.height = parseInt(32 * datesListColumnLength) + 'px'; 
                } else {
                    div.style.height = parseInt(32 * activePaintersCentury.length) + 'px'; 
                }
                nodeDatesList.append(div);
                
            });     
        } 
    }
  

    // плавная навигация по элементам главного меню
    document.querySelectorAll('.nav-link').forEach(function(navLink) {
        navLink.addEventListener('click', function(event) {

            event.preventDefault();

            let section = document.querySelector(this.getAttribute('href'));

            let offset = section.offsetTop;

            // вариант 1 - не работает в сафари
            //section.scrollIntoView({behavior: "smooth"});

            // вариант 2 - не работает в сафари
            // window.scrollTo({
            //     top: offset,
            //     behavior: "smooth"
            // });

            if (document.querySelector('.open') != null) {
                menuBurger.classList.remove('open');        
            }

            // вариант 3
            $("html, body").animate({scrollTop: offset}, 800);

            // вариант 4
            // должен быть реализован на чистом js (использование анимации?)
        })
    })

    // gallery
    // выпадающий список
    const element = document.querySelector('#selectFilter');
        
    const choices = new Choices(element, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        choices: [
            { value: 'автор', label: 'Автор' },
            { value: 'направление', label: 'Направление' },
            { value: 'техника', label: 'Техника' },
          ],
    });


    document.querySelectorAll('.flags-list__link').forEach(function(tabsFlag) {
        tabsFlag.addEventListener('click', function(event) {

            event.preventDefault();

            document.querySelector('.flags-list__link--active').classList.remove('flags-list__link--active');
            tabsFlag.classList.add('flags-list__link--active');

            // очистка дивов 
            document.querySelectorAll('.dates__list-column').forEach(function(listColumn) {
                listColumn.remove();
            });

            // заполнение новых дивов 
            activeCountry = event.currentTarget.dataset.path;
            activePainterNum = 1;
            if (activeCountry == 'italy') activePainterNum = 12;

            showPaintersList(activeCountry, activePainterNum);
            showPainterInfo(activePainterNum);
             
        })
    })

    document.querySelector('.dates').onclick = function(event) {

        let target = event.target; // где был клик?

        if (target.tagName != 'A') return;
            
        event.preventDefault();

        showPainterInfo(target.dataset.pid);

    }

    function showPainterInfo(painterId) {

        let activePainter = activePainters.find(item => item.id == painterId);

        if (activePainter != undefined) {

            document.querySelector('.dates__link--active').classList.remove('dates__link--active');        
            document.querySelector(`[data-pid="${painterId}"]`).classList.add('dates__link--active');

            document.querySelector('.painter-info__name').innerText = activePainter.name;
            document.querySelector('.painter-info__dates').innerText = activePainter.dates;
            document.querySelector('.painter-info__description').innerText = activePainter.descr;
            document.querySelector('.painter-info__portrait').src = activePainter.portret;
            document.querySelector('.painter-info__portrait').alt = activePainter.name;
        }
        else {
            document.querySelector('.painter-info__name').innerText = '';
            document.querySelector('.painter-info__dates').innerText = '';
            document.querySelector('.painter-info__description').innerText = '';
            document.querySelector('.painter-info__portrait').src = 'img/no_foto.png';
            document.querySelector('.painter-info__portrait').alt = 'нет изображения';            
        }

    }

    // catalog, accordion on jquery ++++++++++++++++++++++++++++++++++++++++++ 

    $( function() {
        $( "#accordion" ).accordion();
      } );

    $( "#accordion" ).accordion({
        active: false,
        collapsible: true,
        heightStyle: "content",
    });


    document.querySelectorAll('.ui-corner-all, .ui-corner-top').forEach(function(menuItem) {

        menuItem.addEventListener('mouseover', function(event) {
            if (!menuItem.classList.contains('ui-accordion-header-active')) {
                menuItem.style.borderBottom = '1px solid var(--violet)';
            }
        })      

        menuItem.addEventListener('mousedown', function(event) {
            menuItem.style.borderBottom = '1px solid var(--dark-violet)';
        })

    })

    document.querySelector('.arrow').style.transform = 'rotate(180deg)';

    $( "#accordion" ).on( "accordionbeforeactivate", function( event, ui ) {
    
        ui.newHeader.css( "border-bottom", "none" );;

        ui.newHeader.find(".arrow").css("transform", "rotate(180deg)");
        ui.oldHeader.find(".arrow").css("transform", "rotate(360deg)");

    } );
  
    $( "#accordion" ).on( "accordionactivate", function( event, ui ) {

        ui.oldHeader.css( "border-bottom", "1px solid var(--violet)" );
        ui.newPanel.css( "border-bottom", "1px solid var(--violet)" );
        ui.newPanel.css( "margin-bottom", "1px" );

    } );
  
    // events - нажатие кнопки "Все события" {

    document.querySelector('.events__btn').onclick = function(event) {
        document.querySelector('.events__btn').style.display = "none";
        document.querySelectorAll('.display-none').forEach(function(event) {        
            event.classList.remove('display-none');
        })
    }


    // Форма "Заказать обратный звонок" {

    let selector = document.getElementById("phone");
    let im = new Inputmask("+7 (999)-999-99-99");
    im.mask(selector);

    new JustValidate('.contacts__form', {
        rules: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 30,
            },
            tel: {
                required: true,
                function: (name, value) => {
                    const phone = selector.inputmask.unmaskedvalue();
                    return Number(phone) && phone.length === 10;
                },
            },
        },
        messages: {
            name: {
                required: 'Поле "Имя" обязательно для заполнения',
                minLength: 'Имя должно содержать не менее 2-х символов',
            },
            tel: {
                required: 'Поле "Телефон" обязательно для заполнения',
                function: 'Номер телефона должен состоять из 10 цифр',
            },               
          },
    })
    // Форма "Заказать обратный звонок" }

})

