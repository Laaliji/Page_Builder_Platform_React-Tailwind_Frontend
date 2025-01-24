import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import TopBarProgress from 'react-topbar-progress-indicator';
import Button from './Button';
import config from '../../template/config/index.json';
import { useSelector } from 'react-redux';
import translations from "@/locale/translations";


TopBarProgress.config({
  barColors: {
    "0": "#2563eb",   
    "1.0": "#1d4ed8"
  },
  shadowBlur: 5
});

const MainHero: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mainHero } = config;

  const { selectedLang } = useSelector(
    (state) => state.values
  );

  const handleCommencezClick = (): void => {
    setLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      {loading && <TopBarProgress />}
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">
            <span className="block xl:inline">{translations[selectedLang].create_website_without_coding} </span>{' '}
            <span className="block text-primary xl:inline">
              <Typewriter
                words={[ 
                  translations[selectedLang].simple, 
                  translations[selectedLang].fast, 
                  translations[selectedLang].intuitive, 
                ]}
                loop={100}
                cursor
                cursorStyle="."
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          {translations[selectedLang].platform_description}
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Button
              onClick={handleCommencezClick}
              variant="primary"
              disabled={loading}
            >
              {translations[selectedLang].get_started}
            </Button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Button
              href={mainHero.secondaryAction?.href}
              variant="primary"
            >
              {translations[selectedLang].contact_us}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;