import { useState } from "react";
import { campaignTypes } from "../constants";

const CampaignTypes = ({
  campaignDetailsChange,
  campaignDetails,
  onNextStepClick,
  progress,
  handleProgress,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState({
    id: null,
    platform: "",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="px-8 pt-5 pb-12 flex flex-col gap-6 border border-[#DAE6FF] rounded-[10px] bg-white">
        <h3 className="pb-[5px] border-b border-b-[#EAEAEA] base-bold">
          What you want to do?{" "}
          <span className="small-regular opacity-50">(Step 1 of 4)</span>
        </h3>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {campaignTypes.map((campaignType) => (
            <div
              key={campaignType.id}
              onClick={() => {
                setSelectedPlatform({
                  ...selectedPlatform,
                  id: campaignType.id,
                  platform: campaignType.platform,
                });
                const updatedProgress = [...progress];
                updatedProgress[0] = 60;
                handleProgress(updatedProgress);
              }}
              className={`shadow-sm relative flex items-center gap-3 px-6 py-5 border-[1.5px] ${
                selectedPlatform.id === campaignType.id
                  ? "border-[#0F6EFF]"
                  : "border-[#F3F3F3] cursor-pointer"
              } rounded-[10px]`}
            >
              <img
                src={campaignType.icon}
                alt={campaignType.iconAlt}
                className="invert-blue"
              />

              <div className="flex flex-col gap-1">
                <p className="base-medium text-[#0B1A33] tracking-[-0.32px]">
                  {campaignType.title}
                </p>

                <p className="text-[13px] opacity-50 tracking-[-0.26px]">
                  {campaignType.description}
                </p>
              </div>

              <img
                src="/assets/icons/tick-circle-solid.svg"
                alt="tick circle"
                className={`absolute -top-3 -right-3 ${
                  selectedPlatform.id !== campaignType.id && "hidden"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="ml-auto"
        onClick={() => {
          if (!selectedPlatform.platform) return;
          const copiedData = { ...campaignDetails };
          const updatedProgress = [...progress];
          updatedProgress[0] = 100;
          handleProgress(updatedProgress);
          campaignDetailsChange({
            ...copiedData,
            platform: selectedPlatform.platform,
          });
          onNextStepClick();
        }}
      >
        <button
          className={`${
            !selectedPlatform.platform && "opacity-50 pointer-events-none"
          } min-w-[237px] py-4 bg-[#0F6EFF] rounded-[10px] base-medium text-white`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CampaignTypes;
