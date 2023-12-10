import React from "react";
import Cart from "./ProductCard";
import { useGetAllProductsQuery } from "../components/store/features/ProductApi";
import ProductCard from "./ProductCard";

const ProductPage = () => {
  const {data , error , isLoading} = useGetAllProductsQuery()
  console.log("product page data",data)
    const products =[
        {
            id: 1,
            title: "Product 1",
            description:"I am a product 1",
            price: 10,
            quantity: 2,
            img:"https://source.unsplash.com/collection/928424/480x480"
          },
          {
            id: 2,
            title: "Product 2",
            description:"I am a product 2",
            price: 15,
            quantity: 1,
            img:"https://source.unsplash.com/collection/928423/480x480"
          },
    ]
  return (
    <>
    {
      isLoading ? <p>Loading </p> : error ? <p>An error occured</p> :
      <>
      <div className="product-page container-fluid">
    <div className="d-flex justify-content-evenly my-4">
      <div className="container-fluid">
        <div className="row justify-content-center my-4">
          {data?.data?.map((product) => (
            <div
              key={product.id}
              className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
      </>
    }
    </>
  );
};

export default ProductPage;
