import { useState } from "react";

import { productTypes } from "../constants";

const ChooseProduct = ({
  campaignDetailsChange,
  campaignDetails,
  onNextStepClick,
  progress,
  handleProgress,
}) => {
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    productImg: "",
    productName: "",
    productPrice: "",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="px-8 pt-5 pb-12 flex flex-col gap-6 border border-[#DAE6FF] rounded-[10px] bg-white">
        <h3 className="pb-[5px] border-b border-b-[#EAEAEA] base-bold">
          Choose the Product{" "}
          <span className="small-regular opacity-50">(Step 2 of 4)</span>
        </h3>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {productTypes.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct({
                  ...selectedProduct,
                  id: product.id,
                  productImg: product.icon,
                  productName: product.productName,
                  productPrice: product.price,
                });
                const updatedProgress = [...progress];
                updatedProgress[1] = 60;
                handleProgress(updatedProgress);
              }}
              className={`shadow-sm relative flex items-center gap-3 px-6 py-5 border-[1.5px] ${
                selectedProduct.id === product.id
                  ? "border-[#0F6EFF]"
                  : "border-[#F3F3F3] cursor-pointer"
              } rounded-[10px]`}
            >
              <img src={product.icon} alt={product.iconAlt} />

              <div className="flex flex-col gap-1">
                <p className="base-medium text-[#0B1A33] tracking-[-0.32px]">
                  {product.productName}
                </p>

                <p className="text-[13px] opacity-50 tracking-[-0.26px]">
                  {product.price}
                </p>
              </div>

              {selectedProduct.id === product.id ? (
                <img
                  src="/assets/icons/tick-circle-solid.svg"
                  alt="tick circle"
                  className="my-auto absolute right-4"
                />
              ) : (
                <img
                  src="/assets/icons/tick-circle.svg"
                  alt="tick circle"
                  className="my-auto absolute right-4"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="w-fit ml-auto flex justify-end"
        onClick={() => {
          if (
            !selectedProduct.productImg ||
            !selectedProduct.productName ||
            !selectedProduct.productPrice
          )
            return;
          const copiedData = { ...campaignDetails };
          campaignDetailsChange({
            ...copiedData,
            productImg: selectedProduct.productImg,
            productName: selectedProduct.productName,
            productPrice: selectedProduct.productPrice,
          });
          const updatedProgress = [...progress];
          updatedProgress[1] = 100;
          handleProgress(updatedProgress);
          onNextStepClick();
        }}
      >
        <button
          className={`${
            (!selectedProduct.productImg ||
              !selectedProduct.productName ||
              !selectedProduct.productPrice) &&
            "opacity-50 pointer-events-none"
          } min-w-[237px] py-4 bg-[#0F6EFF] rounded-[10px] base-medium text-white`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ChooseProduct;
