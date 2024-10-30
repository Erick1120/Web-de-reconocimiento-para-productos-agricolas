// components/ProductList.jsx
import React from "react";

import appleImg from "./fruits_and_vegetables/apple.png";
import garlicImg from "./fruits_and_vegetables/garlic.png";
import tangerineImg from "./fruits_and_vegetables/tangerine.png";
import mangoImg from "./fruits_and_vegetables/mango.png";
import bananaImg from "./fruits_and_vegetables/banana.png";
import pearImg from "./fruits_and_vegetables/pear.png";
import pineappleImg from "./fruits_and_vegetables/pineapple.png";
import lemonImg from "./fruits_and_vegetables/lemon.png";
import guayabaImg from "./fruits_and_vegetables/guayaba.png";
import pimentonImg from "./fruits_and_vegetables/bell pepper.png";
import maracuyaImg from "./fruits_and_vegetables/passion fruit.png";
import cebollaImg from "./fruits_and_vegetables/cebolla_larga.png";

export const products = [
  { name: "Manzana", imgSrc: appleImg },
  { name: "Ajo", imgSrc: garlicImg },
  { name: "Mandarina", imgSrc: tangerineImg },
  { name: "Mango", imgSrc: mangoImg },
  { name: "Banano", imgSrc: bananaImg },
  { name: "Pera", imgSrc: pearImg },
  { name: "Piña", imgSrc: pineappleImg },
  { name: "Limón", imgSrc: lemonImg },
  { name: "Guayaba", imgSrc: guayabaImg },
  { name: "Pimenton", imgSrc: pimentonImg },
  { name: "Maracuya", imgSrc: maracuyaImg },
  { name: "Cebolla", imgSrc: cebollaImg },
];

const ProductList = ({ onProductSelect, selectedProducts }) => {
  return (
    <div id="productList">
      {products.map((product) => (
        <div
          className={`product-item ${selectedProducts.includes(product.name) ? "selected" : ""}`}
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
