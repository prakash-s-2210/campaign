import { useState, useEffect, useRef } from "react";
const CampaignCard = ({ campaign, handleChangeStatus, index, filteredCampaignsList, updateCampaignsList }) => {
  const [onOff, setOnOff] = useState(campaign.status === "Live now");
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
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

  useEffect(() => {
    console.log(modalRef.current)
    let handler = (e) => {
      console.log(modalRef.current, e.target)
        if(modalRef.current && !modalRef.current.contains(e.target)){
            setOpenModal(false);
        }
    }
    document.addEventListener("mousedown", handler);
    return () => {
        document.removeEventListener("mousedown", handler);
    }
  }, []);

  return (
    <>
      {openModal && <div className="flex-center fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-40 z-50">
        <div ref={modalRef} className="flex flex-col  gap-8 w-fit p-10 bg-white flex-center rounded-lg">
          <p className="text-xl font-semibold">Are you sure, you want to delete?</p>

          <div className="w-full flex justify-end gap-3">
            <button type="button" className="py-2 px-4 rounded-lg font-bold text-sm bg-gray-300" onClick={() => setOpenModal(false)}>Cancel</button>

            <button type="button" className="py-2 px-4 text-white rounded-lg font-bold text-sm bg-red-600" onClick={() => {
              const updatedCampaignsList = filteredCampaignsList.filter((item) => item.id !== campaign.id);
              updateCampaignsList(updatedCampaignsList);
            }}>Delete</button>
          </div>
        </div>
      </div>}
      <tr
        key={campaign.productName}
        className={`${
          filteredCampaignsList.length - 1 === index ? "border-b-0" : "border-b border-b-[#EAEAEA]"
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
              created on {campaign.dateCreated}
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
            alt="instagram"
            width={22}
            height={22}
            className="m-auto"
          />
        </td>
        <td>
          <span
            className={`inline-block w-[104px] h-[30px] flex-center rounded-3xl  font-medium ${
              campaign.status === "Live now" && "bg-[#E1FFE0] text-[#317C2E]"
            } ${
              campaign.status === "Paused" && "bg-[#FFF8E0] text-[#D1A307]"
            } ${
              campaign.status === "Exhausted" && "bg-[#FFDEDE] text-[#FC3F3F]"
            }`}
          >
            {campaign.status}
          </span>
        </td>
        <td>
          <div className="flex gap-[18px]">
            <img src="/assets/icons/pen.svg" alt="Pen" className="my-auto" />

            <img src="/assets/icons/trash.svg" alt="Trash" className="cursor-pointer" onClick={() => setOpenModal(true)} />
          </div>
        </td>
      </tr>
    </>
  );
};

export default CampaignCard;
