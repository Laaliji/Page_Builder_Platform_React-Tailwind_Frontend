import React from "react";

import CardPayment from "../../components/payment/cardPyment";
import Analytics from "../../components/landing/Analytics";
import Canvas from "../../components/landing/Canvas";
import Features from "../../components/landing/Features";
import LazyShow from "../../components/landing/LazyShow";
import MainHero from "../../components/landing/MainHero";
import Contact from "../../components/landing/Contact";
import MainHeroImage from "../../components/landing/MainHeroImage";
import Pricing from "../../components/landing/Pricing";
import Product from "../../components/landing/Product";

export default function Landing() {
  return (
    <div className={`bg-background grid overflow-hidden`}>
      <LazyShow>
        <CardPayment />
      </LazyShow>
    </div>
  );
}
