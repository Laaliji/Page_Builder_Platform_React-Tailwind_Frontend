import React from 'react';
import Typewriter from 'typewriter-effect';
import Button from './Button' // Adjust the import path as needed
import config from '../../template/config/index.json';

const MainHero = () => {
  const { mainHero } = config;
  
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline relative">
            <div className="h-40 overflow-hidden">
              <Typewriter
                options={{
                  strings: ['Créez un site web sans coder', 'Simple, rapide et intuitif.'],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}
              />
            </div>
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          La plateforme de création de sites web qui rend le développement web accessible à tous.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Button 
              href={mainHero.primaryAction.href} 
              variant="primary"
            >
              Commencez
            </Button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Button 
              href={mainHero.secondaryAction.href} 
              variant="primary"
            >
              {mainHero.secondaryAction.text}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;