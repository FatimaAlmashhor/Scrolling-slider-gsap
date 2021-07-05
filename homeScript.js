import gsap from 'gsap'

const outer = gsap.utils.toArray('.outer');
const sections = document.querySelectorAll('section')
const header = gsap.utils.toArray('.header')
const coverImg = document.querySelectorAll('.cover-img')

let
    current,
    next = 0,
    direction = 'down',
    listen = false;


const tlDefaults = {
    ease: "slow.inOut",
    duration: 1.25
};

const ImageAnimation = () => {
    if (coverImg !== undefined) {
        return gsap.to(coverImg[next], {
            autoAlpha: 1,
            yPercent: 100,
            duration: 1,
            ease: "power2",
            // stagger: {
            //     each: 0.02,
            //     from: "random"
            // }
        });
    }
}
gsap.set(outer, { yPercent: 100 });
const fedeIn = () => {

    // console.log(coverImg[next]);
    if (current !== undefined) gsap.set(sections[current], { zIndex: 0 });
    gsap.set(sections[next], { autoAlpha: 1, zIndex: 1 });
    gsap.set(header[next], { yPercent: 100 })
    gsap.set(coverImg[next], { yPercent: 0 })

    if (current == undefined) {
        gsap.to(header[current], { yPercent: 100 }, 0)
    }
    const tl = gsap
        .timeline({
            paused: true,
            defaults: tlDefaults,
            onComplete: () => {
                listen = true;
                current = next;
            }
        })
        .to(outer[next], { yPercent: 0 }, 0)
        .to(header[next], { duration: 1, yPercent: 0 }, 0.7)
        .to(coverImg[next], { duration: 1, yPercent: 100 }, '<')

    if (current !== undefined) {
        tl.add(
            gsap
                .timeline()
                // .set(sections[current], { autoAlpha: 0 })
                .set(outer[current], { yPercent: 100 })
                .set(header[current], { yPercent: 100 }, 1)
                .set(coverImg[current], { yPercent: 0 }, '<')

        );
    }

    tl.play(0);

}

const fedeOut = () => {

    gsap.set(sections[current], { zIndex: 1 });
    gsap.set(sections[next], { autoAlpha: 1, zIndex: 0 });
    gsap.set(coverImg[next], { autoAlpha: 1, yPercent: 100 });
    gsap.set(outer[next], { yPercent: 0 });
    gsap.set(header[next], { yPercent: 0 })
    gsap
        .timeline({
            defaults: tlDefaults,
            onComplete: () => {
                listen = true;
                current = next;
            }
        })
        .to(header[current], { yPercent: 100 }, 0)
        .to(coverImg[current], { autoAlpha: 1, yPercent: 0 }, 0)
        .to(outer[current], { yPercent: 100 }, '>')
    // .add(ImageAnimation(), ">-1")
}

const handleDirectionChange = () => {
    listen = false;
    if (direction == 'down') {
        next = current + 1;
        if (next >= sections.length)
            next = 0;
        fedeIn()
    }
    else if (direction == 'up') {
        next = current - 1;
        if (next < 0)
            next = sections.length - 1;
        fedeOut()
    }
}
const handleWheel = (e) => {
    if (!listen) return;

    direction = e.wheelDeltaY < 0 ? "down" : "up";
    handleDirectionChange();
}
document.addEventListener("wheel", handleWheel);
fedeIn()