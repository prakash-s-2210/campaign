import { useState } from "react";
const CampaignCard = ({
  campaign,
  handleChangeStatus,
  index,
  filteredCampaignsList,
  onDeleteClick
}) => {
  const [onOff, setOnOff] = useState(campaign.status === "Live now");
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthAbbreviation = monthNames[parseInt(month, 10) - 1];
    return `${day} ${monthAbbreviation} ${year}`;
  };

  const formatCreatedDate = (date) => {
    const [day, month, year] = date.split("-")
    const parsedDate = new Date(`${year}-${month}-${day} `);
    return `${parsedDate.getDate()} ${parsedDate.toLocaleString("default", {
      month: "short",
    })}`;
  };

  return (
    <tr
      className={`${
        filteredCampaignsList.length - 1 === index
          ? "border-b-0"
          : "border-b border-b-[#EAEAEA]"
      } `}
    >
      <td className="pl-6 py-4">
        <input type="checkbox" />
      </td>
      <td className="py-4">
        <input
          type="checkbox"
          checked={onOff}
          onChange={(e) => {
            setOnOff(e.target.checked);
            handleChangeStatus(e.target.checked, campaign.id);
          }}
          className="cursor-pointer switch flex relative w-[37px] h-[19px] appearance-none bg-[#DADEE3] rounded-[20px] checked:bg-[#0F6EFF] before:content-['-'] before:absolute before:w-4 before:h-4 before:rounded-[20px] before:top-[1.5px] before:left-0.5 before:bg-white before:flex-center before:text-xl before:text-[#DADEE3] before:font-bold before:duration-500 before:scale-[1.1] before:checked:left-[18px] checked:before:content-['+'] checked:before:text-[#0F6EFF]"
        />
      </td>
      <td className="flex gap-3 py-4">
        <img
          src={campaign.productImg}
          alt={campaign.productName}
          width={58}
          height={54}
        />

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium">{campaign.productName}</p>

          <p className="text-xs opacity-60">
            created on {formatCreatedDate(campaign.dateCreated)}
          </p>
        </div>
      </td>
      <td className="small-regular py-4">
        {formatDate(campaign.campaignStartDate)} -{" "}
        {formatDate(campaign.campaignEndDate)}
      </td>
      <td className="small-regular py-4">{campaign.clicks}</td>
      <td className="small-regular py-4">{campaign.budget}</td>
      <td className="small-regular py-4">{campaign.location}</td>
      <td>
        <img
          src={`/assets/icons/${campaign.platform}.svg`}
          alt={campaign.platform}
          width={22}
          height={22}
          className="m-auto"
        />
      </td>
      <td>
        <span
          className={`inline-block w-[104px] h-[30px] flex-center rounded-3xl  font-medium ${
            campaign.status === "Live now" && "bg-[#E1FFE0] text-[#317C2E]"
          } ${campaign.status === "Paused" && "bg-[#FFF8E0] text-[#D1A307]"} ${
            campaign.status === "Exhausted" && "bg-[#FFDEDE] text-[#FC3F3F]"
          }`}
        >
          {campaign.status}
        </span>
      </td>
      <td>
        <div className="flex gap-[18px]">
          <img src="/assets/icons/pen.svg" alt="Pen" className="my-auto" />

          <img
            src="/assets/icons/trash.svg"
            alt="Trash"
            className="cursor-pointer"
            onClick={() => onDeleteClick(campaign.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default CampaignCard;
