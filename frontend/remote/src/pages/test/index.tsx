import Button from "container/Button";
import useStore from "container/hooks/useStore";
import { useStoreSelector } from "container/hooks/useStoreSelector";
import React from "react";

export default function TestPage() {
  const {
    decrementCounter,
    incrementByAmountCounter,
    incrementCounter,
    getProductList,
  } = useStore();
  const {
    counter: { value },
    product: { products },
  } = useStoreSelector((state) => state);
  return (
    <div className="p-2 space-y-2 border">
      <label className="text-black">
        Test Page From Remote Application Hot refresh test
      </label>
      <p>counter value : {value}</p>
      <section className="flex flex-row gap-x-4">
        <Button
          label="Decrement"
          buttonType={"error"}
          onClick={decrementCounter}
        />
        <Button
          label="Increment"
          buttonType={"primary"}
          onClick={incrementCounter}
        />
        <Button
          label="Increment by 5"
          buttonType={"warning"}
          onClick={() => incrementByAmountCounter(5)}
        />
        <Button
          label="Decrement by 5"
          buttonType={"info"}
          onClick={() => incrementByAmountCounter(-5)}
        />
        <Button
          label="Get All Product"
          buttonType={"secondary"}
          onClick={getProductList}
        />
      </section>
      <section className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            className="flex flex-col items-center justify-center text-center text-black border-2 border-gray-300 rounded-lg gap-y-4"
            key={product.id}
          >
            <div>{product.brand}</div>
            <img
              src={product.images[0]}
              className="object-contain w-24 h-24"
              alt={product.brand}
            />
            <em>{product.price} $</em>
          </div>
        ))}
      </section>
    </div>
  );
}
