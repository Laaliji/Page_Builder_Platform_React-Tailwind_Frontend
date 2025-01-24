import React from 'react';
import config from '../../template/config/index.json';
import Divider from './Divider';
import translations from "@/locale/translations";
import { useSelector } from 'react-redux';

// Define types for the product structure
interface ProductItem {
  title: string;
  description: string;
  img: string;
}

interface ProductConfig {
  title: string;
  items: ProductItem[];
}

const Product: React.FC = () => {
  const { selectedLang } = useSelector(
    (state) => state.values
  );
  // Type assertions for the config object
  const { product } = config as { product: ProductConfig };
  const [firstItem, secondItem] = product.items;

  return (
    <section className="bg-tertiary bg-opacity-10 py-8" id="product">
      <div className="container max-w-5xl mx-auto m-8">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center">
          {translations[selectedLang].website_generator_2024.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />
        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6 mt-20">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              {translations[selectedLang].create_professional_website}
            </h3>
            <p className="text-gray-600">{translations[selectedLang].template_description}</p>
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <img
              className="h-auto"
              src={firstItem?.img}
              alt={firstItem?.title}
            />
          </div>
        </div>
        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6">
            <img
              className="h-auto"
              src={secondItem?.img}
              alt={secondItem?.title}
            />
          </div>
          <div className="w-full sm:w-1/2 p-6 mt-20">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              {translations[selectedLang].effortless_customization}
            </h3>
            <p className="text-gray-600 mb-8">{translations[selectedLang].customization_description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
