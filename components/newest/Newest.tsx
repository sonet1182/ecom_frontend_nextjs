import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Link from "next/link";
import Card from "../UI/card/Card";
import { IProduct } from "../../lib/types/products";
import SectionTitle from "../UI/SectionTitle";
import publicApi from "../../services/publicApi";

const Newest = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  let numProductToShow = width >= 1536 ? 12 : 8;

  const newestProducts: IProduct[] = useSelector(
    (state: any) => state.newestProductsList.productsList
  );

  
  const fetchNewestProduct = async () => {
    const response = await publicApi.get(`api/products`);
    if (response.status === 200) {
      setProducts(response.data.data);
      console.log('first', response.data.data)
      setLoading(false);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    fetchNewestProduct();
  }, []);

  return (
    <div className="mx-auto my-4 md:my-8 flex flex-col xl:max-w-[2130px]">
      <SectionTitle title={"newest"} />

      <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12 ">
        {newestProducts
          ? newestProducts
              .slice(0, numProductToShow)
              .map((product, i) => {
                return <Card key={i} product={product} />;
              })
          : null}
      </div>

      <div className="text-center">
        <Link href="/newestProducts">
          <a className="inline-block py-3 px-8 md:px-12 mt-4 text-sm md:text-base bg-palette-primary text-palette-side rounded-xl shadow-lg">
            {t.seeAllNewProducts}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Newest;
