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

// Animação de entrada do header
gsap.to('.header', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.1,
  ease: 'power3.out',
});

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

// Scroll horizontal das imagens
const imagesTrack = document.querySelector('.images-track');

if (imagesTrack) {
  const imageItems = document.querySelectorAll('.image-item');
  const totalWidth = (imageItems.length - 1) * (window.innerWidth * 0.8 + 32); // 80vw + gap
  
  // Animação de entrada do título "Serviços"
  gsap.to('.services-title', {
    opacity: 1,
    y: -30,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.images-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  
  gsap.to(imagesTrack, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '.images-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: '.images-container',
    }
  });

  // Animações de entrada para o conteúdo de cada imagem
  imageItems.forEach((item, index) => {
    const content = item.querySelector('.image-content');
    
    if (content) {
      // Calcular o momento que cada imagem fica visível
      const progress = index / (imageItems.length - 1);
      const scrollStart = `${progress * 25}%`;
      const scrollEnd = `${progress * 75 + 15}%`;

      gsap.to(content, {
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.images-section',
          start: scrollStart,
          end: scrollEnd,
          scrub: 1,
        }
      });
    }
  });
}

// Animações sequenciais para os diferenciais
const diferencialItems = document.querySelectorAll('.diferencial-item');

if (diferencialItems.length > 0) {
  // Garantir estado inicial
  gsap.set(diferencialItems, { opacity: 0, y: 30 });
  
  diferencialItems.forEach((item, index) => {
    const totalItems = diferencialItems.length;
    const startPercent = (index / totalItems) * 100;
    const endPercent = ((index + 0.8) / totalItems) * 100;

    gsap.fromTo(item, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.diferenciais-section',
          start: `top+=${startPercent}% top`,
          end: `top+=${endPercent}% top`,
          scrub: true,
        }
      }
    );
  });
  
  // Animação da linha divisora após os tópicos
  const divider = document.querySelector('.diferenciais-divider');
  if (divider) {
    gsap.set(divider, { width: 0, opacity: 0 });
    
    gsap.fromTo(divider,
      { width: 0, opacity: 0 },
      {
        width: '80%',
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.diferenciais-section',
          start: 'top+=65% top',
          end: 'top+=75% top',
          scrub: true,
        }
      }
    );
  }
  
  // Animação do capacete após a linha divisora
  const capacete = document.querySelector('.capacete-image');
  if (capacete) {
    gsap.set(capacete, { x: '100vw', opacity: 0 });
    
    gsap.fromTo(capacete,
      { x: '100vw', opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.diferenciais-section',
          start: 'top+=78% top',
          end: 'top+=95% top',
          scrub: 1,
        }
      }
    );
    
    // Manter o capacete visível após a animação
    ScrollTrigger.create({
      trigger: '.diferenciais-section',
      start: 'top+=95% top',
      onEnter: () => gsap.set(capacete, { x: 0, opacity: 1 }),
    });
  }
}

console.log('Fluir inicializado');
