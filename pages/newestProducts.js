import { useState, useEffect } from "react";
import { client } from "../lib/client";
import ProductList from "../components/productList/ProductList";
import { newestProductsFn } from "../utilities/sortByTimeStamp";
import publicApi from "../services/publicApi";

const NewestProduct = ({ products, apiData }) => {
  const [productsList, setProductsList] = useState([]);
  const [abc, setAbc] = useState([]);

  useEffect(() => {
    setProductsList(newestProductsFn(products));
    setAbc(apiData);
  }, [products, apiData]);

  return (
    <div className="flex flex-wrap">
      <ul>
        {abc.map((data, i) => (
          <li key={i}>{data.name}</li>
        ))}
      </ul>

      {productsList.length ? <ProductList productList={productsList} /> : null}
    </div>
  );
};

export default NewestProduct;

export const getStaticProps = async () => {
  const productQuery = `*[_type=='product' && slug.current != "asus-zenbook-14-intel-core-i7-16gb-ram-512gb-ssd-14-ips-laptop"]`;
  const products = await client.fetch(productQuery);
  let apiData = [];

  const response = await publicApi.get("products");

  if (response.status === 200) {
    apiData = response.data.data;
  } else {
    console.log("Server Error");
  }

  return {
    props: {
      products: products,
      apiData: apiData,
    },
  };
};
