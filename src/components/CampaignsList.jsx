import CampaignCard from "./CampaignCard";

const CampaignsList = ({ filteredCampaignsList, handleChangeStatus, updateCampaignsList }) => {
  
  return (
    <table className="w-full">
      <tbody>
        <tr className="small-medium border rounded-md">
          <th className="pl-6">
            <input type="checkbox" />
          </th>
          <th className="opacity-50">On/Off</th>
          <th className="opacity-50">Campaign</th>
          <th className="opacity-50">Date Range</th>
          <th className="opacity-50">Clicks</th>
          <th className="opacity-50">Budget</th>
          <th className="opacity-50">Location</th>
          <th className="opacity-50 text-center">Platform</th>
          <th className="opacity-50">Status</th>
          <th className="opacity-50">Actions</th>
        </tr>

        {filteredCampaignsList.map((campaign, index) => (
          <CampaignCard key={campaign.id} campaign = {campaign} handleChangeStatus = {handleChangeStatus} index = {index} filteredCampaignsList = {filteredCampaignsList} updateCampaignsList = {updateCampaignsList} />
        ))}
      </tbody>
    </table>
  );
};

export default CampaignsList;
