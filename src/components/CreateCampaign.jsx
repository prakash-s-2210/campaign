import { useState } from "react";
import CampaignTypes from "./CampaignTypes";
import ChooseProduct from "./ChooseProduct";
import CampaignSettings from "./CampaignSettings";
import ReadyToGo from "./ReadyToGo";
import { steps } from "../constants";

const CreateCampaign = ({addCampaign}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState([0,0,0,0]);
  const [campaignDetails, setCampaignDetails] = useState({
    id: null,
    productImg: "",
    productName: "",
    productPrice: "",
    dateCreated: null,
    campaignTimeline: "",
    campaignStartDate: null,
    campaignEndDate: null,
    clicks: Math.floor(Math.random() * (800 - 200 + 1)) + 200,
    budget: "",
    targetRadius: null,
    location: "",
    platform: "",
    status: "",
  });

  const handleProgress = (currentProgress) => {
    setProgress(currentProgress);
  }

  const campaignDetailsChange = (campaign) => {
    setCampaignDetails({...campaign});
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev+1);
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CampaignTypes campaignDetailsChange = {campaignDetailsChange} campaignDetails = {campaignDetails} onNextStepClick = {handleNextStep} progress = {progress} handleProgress = {handleProgress} />;
      case 2:
        return <ChooseProduct campaignDetailsChange = {campaignDetailsChange} campaignDetails = {campaignDetails} onNextStepClick = {handleNextStep} progress = {progress} handleProgress = {handleProgress} />;
      case 3:
        return <CampaignSettings campaignDetailsChange = {campaignDetailsChange} campaignDetails = {campaignDetails} onNextStepClick = {handleNextStep} progress = {progress} handleProgress = {handleProgress} />;
      case 4:
        return <ReadyToGo addCampaign = {addCampaign} campaignDetails = {campaignDetails} onNextStepClick = {handleNextStep} progress = {progress} handleProgress = {handleProgress} />;
      default:
        return null;
    }
  };

  return (
    <section className="custom-scrollbar bg-[#F6F9FF] h-screen overflow-auto px-[50px] py-10 flex flex-col gap-8">
      <div>
        <p className="h3-bold">Your Ad Campaign</p>

        <p className="base-regular opacity-50 ">
          Launch your ad in just 4 easy steps
        </p>
      </div>

      <div className="relative flex justify-between">
        {steps.map((step, i) => (
          <div className={`step-item relative flex flex-col flex-center w-full  ${i+1 <= currentStep && "active"} ${progress[i] === 0 && "pending"} ${progress[i] === 60 && "progress"} ${progress[i] === 100 && "completed"}`}>
            <div className="step bg-[#E4EAF2] w-16 h-16 rounded-full z-40"><img src={step.icon} alt={step.alt} className={`inline-block p-5 flex-center z-10 relative rounded-full  ${i + 1 <= currentStep && "invert-white"}`} /></div>

            <p className="">{step.label}</p>
          </div>
        ))}
      </div>

      {renderStep()}
    </section>
  );
};

export default CreateCampaign;
