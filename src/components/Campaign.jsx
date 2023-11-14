import { useNavigate } from "react-router-dom"

import CampaignFilter from "./CampaignFilter"
import CampaignsList from "./CampaignsList"

const Campaign = ({campaignsList, filteredCampaignsList,  updateCampaignsList, handleFilterChange, inputData, handleInputChange}) => {
  const navigate = useNavigate();

  const handleChangeStatus = (value, id) => {
    if(value === false){
      const updatedCampaignsList = campaignsList.map((item) => {
        if(item.id === id){
          return {...item, status: "Paused"}
        }
        else{
          return item;
        }
      });

      updateCampaignsList(updatedCampaignsList);
    }
    else{
      const updatedCampaignsList = campaignsList.map((item) => {
        if(item.id === id){
          return {...item, status: "Live now"}
        }
        else{
          return item;
        }
      });

      updateCampaignsList(updatedCampaignsList);
    }
  }

  return (
    <section className="custom-scrollbar bg-[#F6F9FF] h-screen overflow-auto px-[50px] py-10 flex flex-col gap-6">
      <div className="flex-between">
        <div>
          <p className="h3-bold">Your Campaigns</p>

          <p className="base-regular opacity-50 ">Check the list of campigns you created </p>
        </div>

        <button type="button" onClick={() => navigate("/create-campaign")} className="cursor-pointer rounded-lg px-5 py-[14px] bg-[#0F6EFF] flex items-center gap-2">
          <span className="flex-center w-5 h-5 border-2 border-white rounded-full font-bold text-white px-1 text-xl">+</span>

          <p className="text-base font-semibold text-white">Create new campaign</p>
        </button>
      </div>

      {campaignsList?.length > 0 ? (<div className="h-full bg-white flex flex-col gap-6 py-7 px-8 border-[1.5px] border-[#E9E9E9] rounded-[10px]">
        <CampaignFilter handleFilterChange = {handleFilterChange} inputData = {inputData} handleInputChange = {handleInputChange} />

        {(campaignsList?.length > 0 && filteredCampaignsList?.length > 0) ? <CampaignsList filteredCampaignsList = {filteredCampaignsList} handleChangeStatus = {handleChangeStatus} updateCampaignsList = {updateCampaignsList} /> : <div className="flex-1 text-3xl font-bold flex-center">No results found for the applied filters. Try adjusting your criteria.</div>}
      </div>) : <div className="flex-1  text-3xl font-bold flex-center">🚫Oops! It looks like there are no campaigns available yet. Why not create one?🚫</div>}
    </section>
  )
}

export default Campaign