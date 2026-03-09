import Particles, { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useState } from 'react';
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";
import './Mid.scss';
import type { CarouselVariants } from '@src/components/carousel';
import { EASEINOUTQUINT, EASEOUTQUINT } from '@src/utils';
import { motion } from 'motion/react';

function MidParticles() {
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  async function particlesLoaded(container?: Container) {
    console.log(container);
  };

  return (
    init && <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 1,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          move: {
            direction: 'top',
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: { min: 3, max: 7 },
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 100,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
          opacity: {
            value: 0.2,
          },
        },
      }}
    />
  );
}

export default function Mid() {
  const variants: CarouselVariants = {
    enter: {
      opacity: 0,
      y: '100vh'
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        ease: EASEOUTQUINT,
        duration: 4,
        delay: 1
      }
    },
    exit: {
      opacity: 0,
      y: '-100vh',
      transition: {
        ease: EASEINOUTQUINT,
        duration: 1
      }
    }
  }
  return (
    <motion.div variants={variants} className="slide-name-card__mid">
      <MidParticles />
    </motion.div>
  )
}