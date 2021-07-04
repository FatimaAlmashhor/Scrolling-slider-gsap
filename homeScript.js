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
    // gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
    gsap.set(header[current], { autoAlpha: 0, zIndex: 0 })
    // gsap.set(coverImg[next], { yPercent: 90 })
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

        .to(header[next], { autoAlpha: 1, zIndex: 1 }, 0)
        // .from(coverImg[current], { duration: 2, yPercent: 100 }, 2)
        .add(console.log('here the sec state', coverImg[next]))

    if (current !== undefined) {
        tl.add(
            gsap
                .timeline()
                .set(outer[current], { yPercent: 100 })
                .set(sections[current], { autoAlpha: 0 })
                // .add(ImageAnimation(), 0)
                // .set(coverImg[current], { yPercent: 100 }, 0)
                .add(console.log('here the thir state ', coverImg[next]))
            // .set(coverImg[current], { yPercent: 30 })
        );
    }

    tl.play(0);

}

const fedeOut = () => {

    gsap.set(sections[current], { zIndex: 1 });
    gsap.set(sections[next], { autoAlpha: 1, zIndex: 0 });
    gsap.set(coverImg[next], { autoAlpha: 0, yPercent: 100 });
    gsap.set(outer[next], { yPercent: 0 });

    gsap
        .timeline({
            defaults: tlDefaults,
            onComplete: () => {
                listen = true;
                current = next;
            }
        })
        .to(outer[current], { yPercent: 100 }, 0)
        .add(ImageAnimation(), ">-1")
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