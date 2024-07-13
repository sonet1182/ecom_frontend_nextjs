import { useState, useEffect } from "react";
import { client } from "../lib/client";
import ProductList from "../components/productList/ProductList";
import { newestProductsFn } from "../utilities/sortByTimeStamp";
import publicApi from "../services/publicApi";
import FormattedText from "../components/UI/FormattedText";
import Image from "next/image";
import Link from "next/link";
import StarRatingComponent from "react-star-rating-component";
import ProductPrice from "../components/UI/ProductPrice";
import CardActions from "../components/UI/card/CardActions";

const NewestProduct = ({ products, apiData }) => {
  const [productsList, setProductsList] = useState([]);
  const [abc, setAbc] = useState([]);

  useEffect(() => {
    setProductsList(newestProductsFn(products));
    setAbc(apiData);

    console.log("server", apiData);
  }, [products, apiData]);

  return (
    <div className="flex flex-wrap">
      <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12">
        {abc.map((data, i) => (
          <div
            key={i}
            className="col-span-6 sm:col-span-3 md:col-span-4 lg:col-span-3 2xl:col-span-2 shadow-xl my-1 md:my-4 ltr:mr-2 rtl:ml-1 md:mx-6  bg-palette-card rounded-xl flex relative"
          >
            <Link href="">
              <a className="flex md:items-center md:flex-col relative w-full">
                <div className="w-1/2 md:w-full relative bg-slate-400/30 px-1 md:px-6 py-2 rounded-bl-xl rounded-tl-xl md:rounded-tr-xl md:rounded-bl-none rtl:order-2 rtl:md:order-none flex flex-col justify-between items-center">
                  <div className="flex items-center h-full">
                    {data.image ? (
                      <Image
                        src={data.image[0]?.url}
                        width={280}
                        height={300}
                        alt={data.name}
                        className=" drop-shadow-xl object-contain hover:scale-110 transition-transform duration-300 ease-in-out !py-2 "
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  {data?.discount ? (
                    <span className="w-8 sm:w-auto block absolute -top-2 -right-2">
                      <Image
                        src="/images/discount-icon/discount.webp"
                        width={40}
                        height={40}
                        alt="discount-icon"
                      />
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col justify-between  flex-grow  w-1/2 md:w-full  px-1 md:px-3 py-2 md:py-4">
                  <div className="flex justify-center md:justify-start flex-col  flex-grow overflow-hidden">
                    <div className="self-center">
                      <StarRatingComponent
                        name={`product_rate_${data.slug}`}
                        starCount={5}
                        value={4}
                      />
                    </div>
                    <h3 className="text-sm sm:text-[12px] md:text-sm text-center text-palette-mute  ">
                      {data.name}
                    </h3>
                  </div>

                  <ProductPrice price={data.regular_price} discount={12} />
                </div>
              </a>
            </Link>

            <CardActions product={data} />
          </div>
        ))}
      </div>

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
    console.log("Server Error", response);
  }

  return {
    props: {
      products: products,
      apiData: apiData,
    },
  };
};
