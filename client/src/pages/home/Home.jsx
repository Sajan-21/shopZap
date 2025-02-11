import React from "react";
import "./home.css";
import Nav from "../../components/ui-components/navbars/Nav";
import ProductsListing from "../../components/ui-components/products-listing/ProductsListing";

function Home() {
  return (
    <div>
      <Nav />
      <div className="bg-img-1 logo-font flex flex-col gap-10 p-10">
        <h1 className="text-7xl text-white font-bold">
          Choose Green,
          <br /> Live Clean
        </h1>
        <p className="text-white">
          Let's take a look at our eco-friendly products
        </p>
        <button className="border border-white px-3 py-2 text-white w-1/6 hover:bg-white hover:text-green-950 hover:font-bold">
          Shop Now
        </button>
      </div>
      <ProductsListing />
    </div>
  );
}

export default Home;
