import MainSlider from "./modules/slider/sliderMain";
import VideoPlayer from "./modules/playVideo";
import MiniSlider from "./modules/slider/slider-mini";
import Diference from "./modules/diference";
import Form from "./modules/forms";
import Accordion from "./modules/accordion";
import Download from "./modules/download";

window.addEventListener("DOMContentLoaded", () => {
    const slider = new MainSlider({ container: ".page", btns: ".next" });
    slider.render();

    const moduleSlider = new MainSlider({
        container: ".moduleapp",
        btns: ".next",
        btnsPrev: ".prevmodule",
    });
    moduleSlider.render();

    const showUpSlide = new MiniSlider({
        container: ".showup__content-slider",
        prev: ".showup__prev",
        next: ".showup__next",
        activeClass: "card-active",
        animate: true,
    });
    showUpSlide.init();

    const modulesSlider = new MiniSlider({
        container: ".modules__content-slider",
        prev: ".modules__info-btns .slick-prev",
        next: ".modules__info-btns .slick-next",
        activeClass: "card-active",
        animate: true,
        autoplay: true,
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: ".feed__slider",
        prev: ".feed__nav .slick-prev",
        next: ".feed__nav .slick-next",
        activeClass: "feed__item-active",
    });
    feedSlider.init();

    new VideoPlayer(".showup .play", ".overlay").init();
    new VideoPlayer(".module__video-item .play", ".overlay").init();

    new Diference(".officerold", ".officernew", ".officer__card-item").init();

    new Form(".form").init();

    new Accordion(".plus").init();

    new Download(".download").init();
});
