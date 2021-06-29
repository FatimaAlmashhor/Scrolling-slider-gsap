import { gsap } from 'gsap/all'

const sections = document.querySelectorAll('.slider-section');
const images = document.querySelectorAll('.bg');
const heading = gsap.utils.toArray('.heading')
const outer = gsap.utils.toArray('.outer')
const inner = gsap.utils.toArray('.inner')



let listening = false,
  direction = 'down',
  current,
  next = 0;


const tlDefaults = {
  ease: "slow.inOut",
  duration: 1.25
};
gsap.set(outer, { yPercent: 100 });
gsap.set(inner, { yPercent: -100 });

const fedeIn = () => {
  if (current !== undefined)
    gsap.set(sections[current], { zIndex: 0 });

  gsap.set(sections[next], { autoAlpha: 1, zIndex: 1 });
  gsap.set(images[next], { yPercent: 0 });
  gsap.set(heading[next], { autoAlpha: 0, yPercent: 100 });

  let tl = gsap.timeline({
    paused: true,
    defaults: tlDefaults,
    onStart: () => {
      console.log('start animation');
    },
    onComplete: () => {
      listening = true;
      current = next;
      console.log('I am complate');
    }
  })
    .to(outer[next], {
      yPercent: 0,
      background: 'red'
    }, 0)
    .from(images[next], { yPercent: 15 }, 0)

  if (current !== undefined) {
    tl.add(
      gsap.to(images[current], {
        yPercent: -15,
        ...tlDefaults
      }),
      0
    ).add(
      gsap
        .timeline()
        .set(outer[current], { yPercent: 100 })
        .set(inner[current], { yPercent: -100 })
        .set(images[current], { yPercent: 0 })
        .set(sections[current], { autoAlpha: 0 })
    );
  }

  tl.play(0);

}
const fedeOut = () => {

}
const handleDirection = () => {
  listening = false;

  if (direction === 'down') {
    next = current + 1;
    if (next >= sections.length) next = 0;
    fedeIn();
  }
  else {
    next = current - 1;
    if (next < 0) next = sections.length - 1;
    fedeOut();
  }
}
const handleWheel = (e) => {
  if (!listening) return;
  direction = e.wheelDeltaY < 0 ? 'down' : 'up';
  console.log(direction);
  handleDirection();
}

fedeIn();
document.addEventListener('wheel', handleWheel);
