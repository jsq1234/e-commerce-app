import AddToCartButton from "@/components/ui/AddToCartButton";
import { fetchAllProducts } from "@/lib/data";
import Image from "next/image";

export default async function Home() {
  const data = await fetchAllProducts();
  console.log(data);
  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data.map((item, idx) => (
          <div
            key={idx}
            className=" bg-white rounded-lg md:w-full w-72 space-y-4 p-4 px-8 flex flex-col justify-between"
          >
            <div className="relative flex flex-col items-center space-y-2">
              <div className="w-56 h-56 relative bg-slate-100 rounded-xl">
                <Image src={item.image} alt="image" fill />
              </div>
              <h1 className="w-full">{item.title}</h1>
              <div className="w-full flex gap-2 items-end">
                <span>${item.price}</span>
                <span className="text-sm">
                  <s>
                    $
                    {(item.price * (1 + item.discount_percentage / 100)).toFixed(
                      2
                    )}
                  </s>
                </span>
                <span className="text-sm text-red-800">
                  {item.discount_percentage}% OFF
                </span>
              </div>
            </div>
            <AddToCartButton productId={item.id} />
          </div>
        ))}
      </div>
    </>
  );
}
