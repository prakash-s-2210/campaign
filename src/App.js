import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./globals.css";
import { LeftSidebar, Navbar, Campaign, CreateCampaign } from "./components";
import { staticData } from "./constants";

function App() {
  const [activeTab, setActiveTab] = useState("Campaign");
  const [campaignsList, setCampaignsList] = useState(staticData);
  const [filterCampaigns, setFilterCampaigns] = useState({
    platform: "All Platform",
    status: "All Status",
    dateRange: "Last 30 days",
  });
  const [inputData, setInputData] = useState("");

  // sidebar navigation function
  const handleTabChange = (currentTab) => {
    setActiveTab(currentTab);
  };

  // update input text function 
  const handleInputChange = (value) => {
    setInputData(value);
  }

  //On/OFF Check box change function
  const updateCampaignsList = (campaign) => {
    setCampaignsList([...campaign]);
  };

  //Add new campaign
  const handleAddCampaign = (newCampaign) => {
    setCampaignsList([...campaignsList, newCampaign]);
  };

  //Platform filter checking function
  const platformMatch = (campaign, filter) => {
    if (filter === "All Platform") return true;
    return filter.toLowerCase() === campaign.platform;
  };

  // find searched input campaigns 
  const getSearchedCampaign = (campaign) => {
    if(inputData === "") return true;
    return campaign.productName.toLowerCase().includes(inputData);
  }

  //status filter checking function
  const statusMatch = (campaign, filter) => {
    if (filter === "All Status") return true;
    return filter.toLowerCase() === campaign.status.toLowerCase();
  };

  //date range filer checking function
  const dateRangeMatch = (campaign, filter) => {
    const currentDate = new Date();
    const [day, month, year] = campaign.dateCreated.split('-');
    const dateObject = new Date(`${year}-${month}-${day}`);


    switch (filter) {
      case "Last 30 days":
        return currentDate - dateObject <= 30 * 24 * 60 * 60 * 1000;
      case "Last 10 days":
        return currentDate - dateObject <= 10 * 24 * 60 * 60 * 1000;
      case "Last 3 months":
        return currentDate - dateObject <= 3 * 30 * 24 * 60 * 60 * 1000;
      case "Last 6 months":
        return currentDate - dateObject <= 6 * 30 * 24 * 60 * 60 * 1000;
      case "Last 1 Year":
        return currentDate - dateObject <= 365 * 24 * 60 * 60 * 1000;
      default:
        return false; 
    }
  };
  
  //handleFilterChange
  const handleFilterChange = (field, value) => {
    setFilterCampaigns({
      ...filterCampaigns,
      [field]: value
    })
  }

  //filtered Campaigns list
  const filteredCampaignsList = campaignsList.filter((item) => {
    return (getSearchedCampaign(item) && (platformMatch(item, filterCampaigns.platform) || statusMatch(item, filterCampaigns.status) || dateRangeMatch(item, filterCampaigns.dateRange))) ;
  });

  return (
    <main className="flex">
      <LeftSidebar activeTab={activeTab} handleTabChange={handleTabChange} />

      <div className="flex flex-col flex-1 h-screen">
        <Navbar />

        {activeTab === "Campaign" ? (
          <Routes>
            <Route
              path="/"
              element={
                <Campaign
                 filteredCampaignsList = {filteredCampaignsList}
                  campaignsList={campaignsList}
                  handleFilterChange = {handleFilterChange}
                  updateCampaignsList={updateCampaignsList}
                  inputData={inputData}
                  handleInputChange = {handleInputChange}
                />
              }
            ></Route>

            <Route
              path="/create-campaign"
              element={<CreateCampaign addCampaign={handleAddCampaign} />}
            ></Route>
          </Routes>
        ) : (
          <img
            src="/assets/images/not-found.avif"
            alt="Not found"
            className="flex-1 w-fit h-72 m-auto"
          />
        )}
      </div>
    </main>
  );
}

export default App;
