import AddToCartButton from "@/components/ui/AddToCartButton";
import { fetchAllProducts, getProductsInCart } from "@/lib/data";
import { Product } from "@/lib/types";
import Image from "next/image";

export default async function Home() {
  const  result = await Promise.all([fetchAllProducts(), getProductsInCart(1)]);
  const data = result['0'];
  const productIdList = result['1'];
  
  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data.map((item: Product, idx: number) => (
          <div
            key={idx}
            className="rounded-lg shadow-sm shadow-rose-400 md:w-full w-72 space-y-4 p-10 px-8 flex flex-col justify-between"
          >
            <div className="relative flex flex-col items-center space-y-2">
              <div className="w-56 h-56 relative bg-white rounded-xl">
                <Image src={item.image} alt="image" fill />
              </div>
              <h1 className="w-full">{item.title}</h1>
              <div className="w-full flex gap-2 items-center">
                <span>                    $
                    {(item.price * (1 - item.discount_percentage / 100)).toFixed(
                      2
                    )}</span>
                <span className="text-sm">
                  <s>
                    ${item.price}
                  </s>
                </span>
                <span className="text-sm text-red-800">
                  {item.discount_percentage}% OFF
                </span>
              </div>
            </div>
            <AddToCartButton productId={item.id} addedToCart={productIdList.includes(item.id)} />
          </div>
        ))}
      </div>
    </>
  );
}
