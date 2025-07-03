import '../styles/app.scss';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import tabs from "./components/tabs.js";
import initFancybox from "./components/fancybox.js";
import './components/mask.js'
import './components/formValidation.js'
import lozad from 'lozad';


document.addEventListener('DOMContentLoaded', () => {

    initFancybox();
    tabs(document.querySelector('#info-tabs'));
    const observer = lozad();
    observer.observe();


    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('body--lock');
    });

    const submenuParents = document.querySelectorAll('.header__nav-item.has-child > .header__nav-link');

    submenuParents.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = link.parentElement;

            // Закрываем все другие открытые подменю (по желанию)
            document.querySelectorAll('.header__nav-item.has-child.submenu-open').forEach(item => {
                if (item !== parent) item.classList.remove('submenu-open');
            });

            parent.classList.toggle('submenu-open');
        });
    });

    // Закрытие подменю по клику вне его
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = e.target.closest('.header__nav-item.has-child');

        if (!isClickInsideMenu) {
            document.querySelectorAll('.header__nav-item.has-child.submenu-open').forEach(item => {
                item.classList.remove('submenu-open');
            });
        }
    });

    const swiper = new Swiper('.hero__slider', {
        modules: [Navigation, Pagination, Autoplay],

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        autoplay: {
            delay: 1000,
            disableOnInteraction: false
        },
        loop: true,
        watchSlidesProgress: true
    });

    document.addEventListener('mouseenter', event => {
        const el = event.target;
        if (el && el.matches && el.matches('.hero__slider')) {
            // console.log('mouseenter');
            // console.log('autoplay running', swiper.autoplay.running);
            el.swiper.autoplay.stop();
            el.classList.add('swiper-paused');

            const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
            activeNavItem.style.animationPlayState="paused";
        }
    }, true);

    document.addEventListener('mouseleave', event => {
        // console.log('mouseleave', swiper.activeIndex, swiper.slides[swiper.activeIndex].progress);
        // console.log('autoplay running', swiper.autoplay.running);
        const el = event.target;
        if (el && el.matches && el.matches('.hero__slider')) {
            el.swiper.autoplay.start();
            el.classList.remove('swiper-paused');

            const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');

            activeNavItem.classList.remove('swiper-pagination-bullet-active');
            // activeNavItem.style.animation = 'none';

            setTimeout(() => {
                activeNavItem.classList.add('swiper-pagination-bullet-active');
                // activeNavItem.style.animation = '';
            }, 10);
        }
    }, true);
});
