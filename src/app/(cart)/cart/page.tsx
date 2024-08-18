import Button from "@/components/ui/Button";
import { fetchAllCartItemsForUserId } from "@/lib/data";
import Image from "next/image";
import React from "react";

export default async function Page() {
  const result = await fetchAllCartItemsForUserId(1);
  let totalCost = 0;
  let moneySaved = 0;
  let totalMrp = 0;

  result.forEach((item) => {
    const discountedPrice = item.price * (1 - item.discount_percentage / 100);
    const savings = item.price * (item.discount_percentage / 100);

    totalCost += discountedPrice;
    moneySaved += savings;
    totalMrp += item.price * 1;
  });
  return (
    <div className="w-full">
      <h2 className="text-3xl text-center mt-5 font-semibold border border-b-rose-400 border-transparent pb-4">
        YOUR CART
      </h2>
      <div className="flex space-x-24 ml-52">
        <div className="flex flex-col space-y-10 mt-5">
          {result.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg shadow-sm shadow-rose-400 md:w-full w-96 space-y-4 p-10 px-8 flex flex-col justify-between"
            >
              <div className="relative flex space-x-6 self-start">
                <div className="w-64 h-56 relative bg-white rounded-xl">
                  <Image src={item.image} alt="image" fill />
                </div>
                <div className="flex flex-col space-y-1 p-4">
                  <h1 className="">{item.title}</h1>
                  <div className="flex gap-2 items-center">
                    <span>
                      {" "}
                      $
                      {(
                        item.price *
                        (1 - item.discount_percentage / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="text-sm">
                      <s>${item.price}</s>
                    </span>
                    <span className="text-sm text-red-800">
                      {item.discount_percentage}% OFF
                    </span>
                  </div>
                  <select
                    id="my-select"
                    className="w-fit px-2 bg-rose-200 py-1 rounded-lg"
                  >
                    <option value="">Qty {item.quantity}</option>
                    {Array.from({ length: item.stock }, (_, i) => i + 1).map(
                      (i) => (
                        <option key={i} value={`Qty ${i}`}>
                          {i}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border border-transparent border-l-rose-400 w-full flex flex-col pt-10 items-center space-y-2">
          <div className="bg-rose-200 p-6 rounded-lg w-full lg:w-96">
            <h3 className="text-gray-600 mb-2">Price details</h3>
            <div className="flex">
              <span className="flex-1">Total MRP: </span>
              <span>${totalMrp.toFixed(2)}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Discount on MRP: </span>
              <span>-${moneySaved.toFixed(2)}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Total Amount: </span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-5">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
