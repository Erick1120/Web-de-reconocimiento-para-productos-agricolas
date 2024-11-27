// components/ProductList.jsx
import React from "react";

// Frutas
import appleImg from "./fruits_and_vegetables/apple.png";
import tangerineImg from "./fruits_and_vegetables/tangerine.png";
import mangoImg from "./fruits_and_vegetables/mango.png";
import bananaImg from "./fruits_and_vegetables/banana.png";
import pearImg from "./fruits_and_vegetables/pear.png";
import pineappleImg from "./fruits_and_vegetables/pineapple.png";
import lemonImg from "./fruits_and_vegetables/lemon.png";
import guayabaImg from "./fruits_and_vegetables/guayaba.png";
import maracuyaImg from "./fruits_and_vegetables/passion fruit.png";
import platanoImg from "./fruits_and_vegetables/platain.png";
import blackberryimg from "./fruits_and_vegetables/blackberry.png";
import grapeImg from "./fruits_and_vegetables/grape.png";
import papayaImg from "./fruits_and_vegetables/papaya.png";
import luloImg from "./fruits_and_vegetables/lulo.png";
import orangeImg from "./fruits_and_vegetables/orange.png";
import avocadoGreenImg from "./fruits_and_vegetables/avocado green.png";
import avocadoBlackImg from "./fruits_and_vegetables/avocado black.png";
import kiwiImg from "./fruits_and_vegetables/kiwi.png";
import watermelonImg from "./fruits_and_vegetables/watermelon.png";
import grandillaImg from "./fruits_and_vegetables/granadilla.png";

// Verduras
import garlicImg from "./fruits_and_vegetables/garlic.png";
import pimentonImg from "./fruits_and_vegetables/bell pepper.png";
import cebollaImg from "./fruits_and_vegetables/cebolla_larga.png";
import cebolla2Img from "./fruits_and_vegetables/cebolla_cabezona.png";
import cilantroimg from "./fruits_and_vegetables/cilantro.png";
import papaImg from "./fruits_and_vegetables/papa.png";
import tomateImg from "./fruits_and_vegetables/tomate.png";
import beanImg from "./fruits_and_vegetables/bean.png";
import cabbageImg from "./fruits_and_vegetables/cabbage.png";
import carrotImg from "./fruits_and_vegetables/carrot.png";
import cauliflowerImg from "./fruits_and_vegetables/cauliflower.png";
import cucumberImg from "./fruits_and_vegetables/cucumber.png";
import spinachImg from "./fruits_and_vegetables/spinach.png";
import cornImg from "./fruits_and_vegetables/corn.png";
import pumpkinImg from "./fruits_and_vegetables/pumpkin.png";
import parsleyImg from "./fruits_and_vegetables/parsley.png";
import redOnionImg from "./fruits_and_vegetables/red onion.png";

export const products = [
  // Frutas
  { name: "Manzana", imgSrc: appleImg },
  { name: "Mandarina", imgSrc: tangerineImg },
  { name: "Mango", imgSrc: mangoImg },
  { name: "Banano", imgSrc: bananaImg },
  { name: "Pera", imgSrc: pearImg },
  { name: "Piña", imgSrc: pineappleImg },
  { name: "Limón", imgSrc: lemonImg },
  { name: "Guayaba", imgSrc: guayabaImg },
  { name: "Maracuyá", imgSrc: maracuyaImg },
  { name: "Plátano", imgSrc: platanoImg },
  { name: "Mora", imgSrc: blackberryimg },
  { name: "Uva", imgSrc: grapeImg },
  { name: "Papaya", imgSrc: papayaImg },
  { name: "Lulo", imgSrc: luloImg },
  { name: "Naranja", imgSrc: orangeImg },
  { name: "Aguacate Verde", imgSrc: avocadoGreenImg },
  { name: "Aguacate Negro", imgSrc: avocadoBlackImg },
  { name: "Kiwi", imgSrc: kiwiImg },
  { name: "Sandía", imgSrc: watermelonImg },
  { name: "Granadilla", imgSrc: grandillaImg },

  // Verduras
  { name: "Ajo", imgSrc: garlicImg },
  { name: "Cebolla Cabezona", imgSrc: cebolla2Img },
  { name: "Pimentón", imgSrc: pimentonImg },
  { name: "Cebolla Larga", imgSrc: cebollaImg },
  { name: "Cilantro", imgSrc: cilantroimg },
  { name: "Papa", imgSrc: papaImg },
  { name: "Tomate", imgSrc: tomateImg },
  { name: "Fríjol", imgSrc: beanImg },
  { name: "Repollo", imgSrc: cabbageImg },
  { name: "Zanahoria", imgSrc: carrotImg },
  { name: "Coliflor", imgSrc: cauliflowerImg },
  { name: "Pepino", imgSrc: cucumberImg },
  { name: "Espinaca", imgSrc: spinachImg },
  { name: "Maíz", imgSrc: cornImg },
  { name: "Calabaza", imgSrc: pumpkinImg },
  { name: "Perejil", imgSrc: parsleyImg },
  { name: "Cebolla Roja", imgSrc: redOnionImg },
];

const ProductList = ({ onProductSelect, selectedProducts }) => {
  return (
    <div id="productList">
      {products.map((product) => (
        <div
          className={`product-item ${
            selectedProducts.includes(product.name) ? "selected" : ""
          }`}
          key={product.name}
          onClick={() => onProductSelect(product.name)}
          style={{ cursor: "pointer" }}
        >
          <img src={product.imgSrc} alt={product.name} />
          <label>{product.name}</label>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
