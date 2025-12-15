import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin do GSAP
gsap.registerPlugin(ScrollTrigger);

// Inicializar Lenis para smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrar Lenis com ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Animação inicial do logo no hero
gsap.to('.hero-logo', {
  opacity: 1,
  scale: 1,
  duration: 1.2,
  delay: 0.3,
  ease: 'back.out(1.7)',
});

// Animação do título
gsap.to('.hero-title', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.6,
  ease: 'power3.out',
});

// Animação do subtítulo
gsap.to('.hero-subtitle', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.8,
  ease: 'power3.out',
});

// Animação das estatísticas
gsap.to('.hero-stats', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 1,
  ease: 'power3.out',
});

// Ciclar entre as estatísticas com animação de slide
const statItems = document.querySelectorAll('.stat-item');
let currentStatIndex = 0;

if (statItems.length > 0) {
  setInterval(() => {
    const currentStat = statItems[currentStatIndex];
    const nextStatIndex = (currentStatIndex + 1) % statItems.length;
    const nextStat = statItems[nextStatIndex];
    
    // Animar saída (arrasta para a esquerda e some)
    gsap.to(currentStat, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        currentStat.classList.remove('active');
        gsap.set(currentStat, { x: 0 });
      }
    });
    
    // Animar entrada (vem da direita)
    gsap.set(nextStat, { x: 100, opacity: 0 });
    nextStat.classList.add('active');
    gsap.to(nextStat, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out'
    });
    
    currentStatIndex = nextStatIndex;
  }, 3000);
}

// Scroll-based animation do hero
const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.hero-wrapper',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    pin: false,
  }
});

// Animar logo saindo horizontalmente
heroTimeline.to('.hero-logo', {
  x: '100vw',
  opacity: 0,
  duration: 0.3,
  ease: 'power2.in',
}, 0);

// Animar título saindo
heroTimeline.to('.hero-title', {
  x: '100vw',
  opacity: 0,
  duration: 0.3,
  ease: 'power2.in',
}, 0.1);

// Animar subtítulo saindo
heroTimeline.to('.hero-subtitle', {
  x: '100vw',
  opacity: 0,
  duration: 0.3,
  ease: 'power2.in',
}, 0.2);

// Animar estatísticas saindo
heroTimeline.to('.hero-stats', {
  x: '100vw',
  opacity: 0,
  duration: 0.3,
  ease: 'power2.in',
}, 0.3);

console.log('Fluir inicializado');
