import Particles, { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useState } from 'react';
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";
import './Mid.scss';

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
  return <MidParticles />
}