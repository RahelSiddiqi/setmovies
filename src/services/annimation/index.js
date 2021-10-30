import gsap from 'gsap';

const annimation = {
    beforeEnter: (el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(100px)';
    },
    enter: (el, done) => {
        let index = el.dataset.order % 20;
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            onComplete: done,
            delay: 0.3 * index,
        });
    },
};

export default annimation;
