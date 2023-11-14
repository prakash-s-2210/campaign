import { v4 as uuidv4 } from 'uuid';

import { previewImages } from "../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReadyToGo = ({ addCampaign, campaignDetails, onNextStepClick }) => {
  const [selectedPreview, setSelectedPreview] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="px-8 pt-5 pb-12 flex flex-col gap-6 border border-[#DAE6FF] rounded-[10px] bg-white">
        <h3 className="pb-[5px] border-b border-b-[#EAEAEA] base-bold">
          Ready to go{" "}
          <span className="small-regular opacity-50">(Step 4 of 4)</span>
        </h3>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
          {previewImages.map((preview) => (
            <div
              key={preview.id}
              onClick={() => setSelectedPreview(preview.id)}
              className={`relative flex flex-col gap-[15px] p-5 border-[1.5px] ${
                selectedPreview === preview.id
                  ? "border-[#0F6EFF]"
                  : "border-[#F3F3F3] cursor-pointer"
              } rounded-[15px]`}
            >
              <div className="flex justify-start gap-2">
                <img
                  src="/assets/images/user-preview.png"
                  alt="Mukund Cake Shop"
                />
                <div>
                  <h3 className="text-[#2B23A5] base-normal font-questrial">
                    Mukund Cake Shop
                  </h3>

                  <p className="flex text-[#767676] font-questrial text-[10px] leading-5">
                    Sponsored{" "}
                    <img
                      src="/assets/icons/globe.svg"
                      alt="globe"
                      width={12}
                      className="ml-2"
                    />
                  </p>
                </div>
              </div>

              <p className="font-questrial font-semibold text-sm leading-5">
                We are the best bakery around you. Please like my page to get
                updates on exciting offers and discounts
              </p>

              <div className="flex flex-col">
                <img src={preview.imgSrc} alt="Mukund Cake shop" />

                <div className="flex-between pl-3 py-[6px] pr-6 bg-[#F5F5F5] -mt-[2px]">
                  <p className="text-[#2B23A5] text-[11px] font-bold font-questrial leading-[23px]">
                    Mukund Cake Shop
                  </p>

                  <div className="flex gap-1 px-[10px] py-[5px] border  border-[#CED0D4] rounded-sm text-[10px] text-[#4B4F56] font-medium">
                    <img src="/assets/icons/thumb.svg" alt="thumb" />Like
                  </div>
                </div>
              </div>

              {selectedPreview === preview.id && <div className="pt-[5px] flex justify-between gap-2">
                <p className="bg-[#0F6EFF] bg-opacity-10 px-[15px] rounded-[5px] subtle-medium text-[#0F6EFF]">
                  Change image
                </p>

                <p className="bg-[#0F6EFF] bg-opacity-10 px-[15px] rounded-[5px] subtle-medium text-[#0F6EFF]">
                  Edit text
                </p>
              </div>}

              {selectedPreview === preview.id && <img
                src="/assets/icons/tick-circle-solid.svg"
                alt="tick circle"
                className="absolute -top-3 -right-3"
              />}
            </div>
          ))}
        </div>
      </div>

      <div
        className="w-fit ml-auto flex justify-end"
        onClick={() => {
          if (!selectedPreview) return;
          const copiedData = { ...campaignDetails };

          function formatDate(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedDay = String(day).padStart(2, '0');
            const formattedMonth = String(month).padStart(2, '0');
          
            // Format the date string as "DD-MM-YYYY"
            const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
          
            return formattedDate;
          }

          addCampaign({
            ...copiedData,
            id: uuidv4(),
            status: "Live now",
            dateCreated: formatDate(new Date())
          });
          
          navigate("/");
        }}
      >
        <button className={`${!selectedPreview && "opacity-50 pointer-events-none"} min-w-[237px] py-4 bg-[#0F6EFF] rounded-[10px] base-medium text-white`}>
          Start campaign
        </button>
      </div>
    </div>
  );
};

export default ReadyToGo;
