import React from 'react';

import config from '../../template/config/index.json';
import { Code, Database, Grid, Palette } from 'lucide-react';
import CardLanding from './CardLanding';

const Features = () => {
  const { features } = config;
  const { title, subtitle, description, items: featuresList } = features;
  const technologies = [
    {
      name: 'HTML',
      icon: <Code className="w-12 h-12 text-blue-500" />,
      description: 'Language de balisage pour structurer et presenter le contenu web',
      features: ['Structure semantique', 'Accessibilite', 'SEO friendly'],
      color: 'hover:border-blue-500'
    },
    {
      name: 'CSS',
      icon: <Palette className="w-12 h-12 text-blue-500" />,
      description: 'Feuilles de style pour definir la presentation des documents HTML',
      features: ['Responsive design', 'Animations', 'Flexbox/Grid'],
      color: 'hover:border-blue-500'
    },
    {
      name: 'PHP',
      icon: <Database className="w-12 h-12 text-blue-500" />,
      description: 'Language de programmation cote serveur pour sites web dynamiques',
      features: ['Backend robuste', 'Gestion BDD', 'Securite'],
      color: 'hover:border-blue-500'
    },
    {
      name: 'BOOTSTRAP',
      icon: <Grid className="w-12 h-12 text-blue-500" />,
      description: 'Framework CSS pour developpement rapide interfaces responsive',
      features: ['Composants prets', 'Systeme de grille', 'Personnalisable'],
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
            {title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {description}
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
