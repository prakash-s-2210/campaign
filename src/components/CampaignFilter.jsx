import Dropdown from "./Dropdown";

const CampaignFilter = ({handleFilterChange, inputData, handleInputChange}) => {
  return (
    <section className="flex-between">
      <div className="min-w-[315px] relative flex gap-2 items-center py-2 pr-4 pl-12 border-[1.5px] border-[#E9E9E9] rounded-[10px]">
        <img
          src="/assets/icons/search.svg"
          className="absolute left-4"
          alt="Search"
        />

        <input
          type="text"
          value={inputData}
          onChange={(e) => handleInputChange(e.target.value)}
          className="base-regular opacity-50 w-full focus:outline-none"
          placeholder="Search for the campaign"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-[6px]">
          <p className="opacity-50 base-regular">Platform:</p>

          <Dropdown
            onSelectValue={(option) => handleFilterChange("platform", option)}
            options={["All Platform", "Google", "FB", "Youtube", "Instagram"]}
            preSelect={true}
          />
        </div>

        <div className="flex items-center gap-[6px]">
          <p className="opacity-50 base-regular">Status:</p>

          <Dropdown
            onSelectValue={(option) => handleFilterChange("status", option)}
            options={["All Status", "Live now", "Paused", "Exhausted"]}
            preSelect={true}
          />
        </div>

        <Dropdown
          onSelectValue={(option) => handleFilterChange("dateRange", option)}
          options={["Last 30 days", "Last 10 days", "Last 3 months", "Last 6 months", "Last 1 Year"]}
          preSelect={true}
        />
      </div>
    </section>
  );
};

export default CampaignFilter;
