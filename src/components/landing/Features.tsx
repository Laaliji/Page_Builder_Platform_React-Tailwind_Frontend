import React from 'react';

import config from '../../template/config/index.json';
import { Code, Database, Grid, Palette } from 'lucide-react';
import CardLanding from './CardLanding';
import translations from "@/locale/translations";
import { useSelector } from 'react-redux';

const Features = () => {

  const { selectedLang } = useSelector(
    (state) => state.values
  );

  const { features } = config;
  const { title, subtitle, description, items: featuresList } = features;
  const technologies = [
    {
      name: 'HTML',
      icon: <Code className="w-12 h-12 text-blue-500" />,
      description: translations[selectedLang].html_description,
      features: [translations[selectedLang].html_features[0],translations[selectedLang].html_features[1],translations[selectedLang].html_features[2],],
      color: 'hover:border-blue-500'
    },
    {
      name: 'CSS',
      icon: <Palette className="w-12 h-12 text-blue-500" />,
      description: translations[selectedLang].css_description,
      features: [translations[selectedLang].css_features[0],translations[selectedLang].css_features[1],translations[selectedLang].css_features[2],],
      color: 'hover:border-blue-500'
    },
    {
      name: 'PHP',
      icon: <Database className="w-12 h-12 text-blue-500" />,
      description: translations[selectedLang].php_description,
      features: [translations[selectedLang].php_features[0],translations[selectedLang].php_features[1],translations[selectedLang].php_features[2],],
      color: 'hover:border-blue-500'
    },
    {
      name: 'BOOTSTRAP',
      icon: <Grid className="w-12 h-12 text-blue-500" />,
      description: translations[selectedLang].bootstrap_description,
      features: [translations[selectedLang].bootstrap_features[0],translations[selectedLang].bootstrap_features[1],translations[selectedLang].bootstrap_features[2],],
      color: 'hover:border-blue-500'
    }
  ];

  return (
    <div className={`py-14 bg-background`} id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
          >
            {translations[selectedLang].innovative_technologies}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {translations[selectedLang].best_technologies}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {translations[selectedLang].technologies_description}
          </p>
        </div>

        <div className="grid pt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            technologies.map((tech,idx)=>{return <CardLanding key={idx} icon={tech.icon} name={tech.name} description={tech.description} features={tech.features} color={tech.color}/> })
          }
        </div>
      </div>
    </div>
  );
};

export default Features;
