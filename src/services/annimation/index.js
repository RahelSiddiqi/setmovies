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
    format: (dateString) => {
        if (dateString === undefined || dateString === '') {
            return;
        }
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(
            date
        );
    },
  calculateAge: ( dob ) =>
  {
      
        const date = new Date(dob);
        var diff_ms = Date.now() - date.getTime();
        var age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    },
};

export default annimation;
