import { useState } from "react";
import Dropdown from "./Dropdown";
import { cities } from "../constants";

const CampaignSettings = ({
  campaignDetailsChange,
  campaignDetails,
  onNextStepClick,
  progress,
  handleProgress,
}) => {
  const [selectValue, setSelectValue] = useState({
    budget: 100,
    radius: 1,
  });
  const [left, setLeft] = useState({
    budget: 0,
    radius: 0,
  });

  const [inputData, setInputData] = useState({
    campaignTimeline: false,
    startDate: "",
    endDate: "",
    locationType: false,
    location: "",
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-col gap-6 max-w-[900px]">
      <div className="px-8 pt-5 pb-12 flex flex-col gap-6 border border-[#DAE6FF] rounded-[10px] bg-white">
        <h3 className="pb-[5px] border-b border-b-[#EAEAEA] base-bold">
          Campaign Settings{" "}
          <span className="small-regular opacity-50">(Step 3 of 4)</span>
        </h3>

        <div className="flex flex-col">
          <div>
            <div>
              <span className="py-0.5 px-1.5 rounded-full bg-[#0F6EFF] subtle-bold text-white">
                1
              </span>
              <span className="ml-2 subtle-medium underline">
                Budget and dates info
              </span>
            </div>

            <div className="flex gap-[26px] pl-[7px]">
              <span className="border-[1.5px] border-opacity-[0.16]"></span>

              <div className="flex-1 flex flex-col gap-4 pt-2 pb-4">
                <div>
                  <p className="subtle-medium text-[#606060]">
                    Budget Timeline
                  </p>

                  <input
                    type="checkbox"
                    checked={inputData.campaignTimeline}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        campaignTimeline: e.target.checked,
                      })
                    }
                    className="switch flex relative w-[229px] h-[39px] appearance-none bg-[#F0F0F0] rounded-[20px] cursor-pointer before:content-['Lifetime'] before:absolute before:w-28  before:h-[36px] before:rounded-[20px] before:top-[1.5px] before:left-0.5 before:bg-[#0F6EFF] before:z-20 before:flex-center before:small-medium before:text-[#fff] before:duration-300 before:scale-[1.1] before:checked:left-[110px] checked:before:content-['Daily'] after:content-['Daily'] checked:after:content-['Lifetime'] after:absolute checked:after:left-8 after:right-10 after:top-2  after:text-[#999] checked:before:text-[#fff]"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="max-w-[363px] w-full flex flex-col">
                    <label
                      id="start-date"
                      htmlFor="start-date"
                      className="subtle-medium text-[#606060]"
                    >
                      Start date
                    </label>

                    <input
                      type="date"
                      value={inputData.startDate}
                      min={getCurrentDate()}
                      onChange={(e) => {
                        if (
                          inputData.endDate &&
                          new Date(e.target.value) > new Date(inputData.endDate)
                        )
                          return;
                        setInputData({
                          ...inputData,
                          startDate: e.target.value,
                        });
                      }}
                      className="p-[14px] border-[1.5px] border-[#E9E9E9] rounded-[10px]"
                    />
                  </div>

                  <div className="max-w-[363px] w-full flex flex-col">
                    <label
                      id="end-date"
                      htmlFor="end-date"
                      className="subtle-medium text-[#606060]"
                    >
                      End date
                    </label>

                    <input
                      type="date"
                      value={inputData.endDate}
                      min={getCurrentDate()}
                      onChange={(e) => {
                        if (
                          inputData.startDate &&
                          new Date(e.target.value) <
                            new Date(inputData.startDate)
                        )
                          return;
                        setInputData({ ...inputData, endDate: e.target.value });
                        const updatedProgress = [...progress];
                        updatedProgress[2] = 60;
                        handleProgress(updatedProgress);
                      }}
                      className="p-[14px] border-[1.5px] border-[#E9E9E9] rounded-[10px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pb-8">
                  <div className="flex justify-between">
                    <div className="subtle-medium text-[#606060]">
                      Enter campaign budget
                    </div>

                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/icons/india.svg"
                        alt="India flag symbol"
                      />

                      <p>INR</p>

                      <img
                        src="/assets/icons/arrow-down.svg"
                        alt="arrow down"
                      />
                    </div>
                  </div>

                  <div className=" relative">
                    <input
                      type="range"
                      min={100}
                      max={100000}
                      value={selectValue.budget}
                      onChange={(e) => {
                        const currentValue = parseInt(e.target.value, 10);
                        const percentage =
                          ((currentValue - 100) / (100000 - 100)) * 100;
                        setLeft({
                          ...left,
                          budget: percentage,
                        });
                        setSelectValue({
                          ...selectValue,
                          budget: e.target.value,
                        });
                      }}
                      id="slider"
                      className="cursor-pointer"
                    />

                    <div
                      className={`absolute bottom-[-1px] z-20`}
                      style={{
                        left: `${Math.floor(left.budget)}%`,
                        transform: `translateX(-${Math.floor(left.budget)}%)`,
                      }}
                    >
                      <div className="h-5 w-5 bg-[#1977F3] rounded-full">
                        <span className="w-[8px] h-[8px] border-b-[8px] border-b-black border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent absolute top-[22px] left-[6px]"></span>
                      </div>

                      <div
                        style={{
                          left: `${Math.floor(left.budget)}%`,
                          transform: `translateX(-${Math.floor(left.budget)}%)`,
                        }}
                        className={`flex items-center gap-[2px] text-white z-30 absolute top-7  bg-black px-[9px] py-[5px]`}
                      >
                        <span className="text-[8px] tracking-[-0.08px]">
                          Rs.{" "}
                        </span>
                        <span className="text-xs font-bold text-white tracking-[-0.24px]">
                          {parseInt(selectValue.budget).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        width: `${Math.floor(left.budget)}%`,
                        height: "5px",
                      }}
                      className={`bg-[#1977F3] rounded-[5px] absolute top-[12px] z-10`}
                    ></div>

                    <span className="absolute left-0 top-5 z-10 subtle-medium text-[#606060]">
                      100
                    </span>

                    <span className="absolute right-0 top-5 z-10 subtle-medium text-[#606060]">
                      1,00,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <span className="h-5 flex-center py-0.5 px-1.5 no-underline rounded-full bg-[#0F6EFF] subtle-bold text-white">
                2
              </span>
              <span className="text-xs font-medium underline">
                Location info
              </span>
            </div>

            <div className="pl-7 flex-1 flex flex-col gap-4 pt-2 pb-4">
              <div>
                <p className="subtle-medium text-[#606060]">Location type</p>

                <input
                  type="checkbox"
                  checked={inputData.locationType}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      locationType: e.target.checked,
                    })
                  }
                  className="switch flex relative w-[229px] h-[39px] appearance-none bg-[#F0F0F0] rounded-[20px] cursor-pointer before:content-['location'] before:absolute before:w-28  before:h-[36px] before:rounded-[20px] before:top-[1.5px] before:left-0.5 before:bg-[#0F6EFF] before:z-20 before:flex-center before:small-medium before:text-[#fff] before:duration-300 before:scale-[1.1] before:checked:left-[110px] checked:before:content-['Radius'] after:content-['Radius'] checked:after:content-['location'] after:absolute checked:after:left-8 after:right-10 after:top-2  after:text-[#999] checked:before:text-[#fff]"
                />
              </div>

              {inputData.locationType === false ? (
                <div className="w-full flex flex-col">
                  <label
                    id="location"
                    htmlFor="location"
                    className="subtle-medium text-[#606060]"
                  >
                    Select location
                  </label>

                  <Dropdown
                    onSelectValue={(value) =>
                      setInputData({ ...inputData, location: value })
                    }
                    className="opacity-50"
                    options={cities}
                    preSelect={false}
                    placeholder="Select a place name, address or coordinates"
                    styles="text-base leading-8 opacity-40"
                    imgSrc="/assets/icons/gps.svg"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2 pb-8">
                  <p className="subtle-medium text-[#606060]">
                    Select target radius
                  </p>

                  <div className=" relative">
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={selectValue.radius}
                      onChange={(e) => {
                        const currentValue = parseInt(e.target.value, 10);
                        const percentage =
                          ((currentValue - 1) / (30 - 1)) * 100;
                        setLeft({
                          ...left,
                          radius: percentage,
                        });
                        setSelectValue({
                          ...selectValue,
                          radius: e.target.value,
                        });
                      }}
                      id="slider"
                      className="cursor-pointer"
                    />

                    <div
                      className={`absolute bottom-[-1px] z-20`}
                      style={{
                        left: `${Math.floor(left.radius)}%`,
                        transform: `translateX(-${Math.floor(left.radius)}%)`,
                      }}
                    >
                      <div className="h-5 w-5 bg-[#1977F3] rounded-full">
                        <span className="w-[8px] h-[8px] border-b-[8px] border-b-black border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent absolute top-[22px] left-[6px]"></span>
                      </div>

                      <div
                        style={{
                          left: `${Math.floor(left.radius)}%`,
                          transform: `translateX(-${Math.floor(left.radius)}%)`,
                        }}
                        className={`flex items-center gap-[2px] text-white z-30 absolute top-7  bg-black px-[9px] py-[5px]`}
                      >
                        <span className="text-xs font-bold text-white tracking-[-0.24px]">
                          {selectValue.radius}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        width: `${Math.floor(left.radius)}%`,
                        height: "5px",
                      }}
                      className={`bg-[#1977F3] rounded-[5px] absolute top-[12px] z-10`}
                    ></div>

                    <span className="absolute left-0 top-5 z-10 subtle-medium text-[#606060]">
                      1
                    </span>

                    <span className="absolute right-0 top-5 z-10 subtle-medium text-[#606060]">
                      30
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="ml-auto absolute right-[50px] bottom-12"
        onClick={() => {
          if (!inputData.startDate || !inputData.endDate || !inputData.location)
            return;
          const copiedData = { ...campaignDetails };
          campaignDetailsChange({
            ...copiedData,
            campaignTimeline: inputData.campaignTimeline ? "Daily" : "Lifetime",
            campaignStartDate: inputData.startDate,
            campaignEndDate: inputData.endDate,
            budget:
              "INR." + parseInt(selectValue.budget).toLocaleString("en-IN"),
            location: inputData.location,
            targetRadius: parseInt(selectValue.radius),
          });
          const updatedProgress = [...progress];
          updatedProgress[2] = 100;
          handleProgress(updatedProgress);
          onNextStepClick();
        }}
      >
        <button
          className={`${
            (!inputData.startDate ||
              !inputData.endDate ||
              !inputData.location) &&
            "opacity-50 pointer-events-none"
          } min-w-[237px] py-4 bg-[#0F6EFF] rounded-[10px] base-medium text-white`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CampaignSettings;
