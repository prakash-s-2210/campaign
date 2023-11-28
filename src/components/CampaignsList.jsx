import { useState, useEffect, useRef } from "react";

import CampaignCard from "./CampaignCard";

const CampaignsList = ({
  filteredCampaignsList,
  handleChangeStatus,
  updateCampaignsList,
  campaignsList,
}) => {
  const [openModal, setOpenModal] = useState({
    modalState: false,
    campaignId: null,
  });
  const modalRef = useRef(null);

  // Update openModal Campaign Id 
  const handleOpenModal = (id) => {
    setOpenModal({...openModal, modalState: true, campaignId: id})
  }

  useEffect(() => {
    let handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal({...openModal, modalState: false});
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {openModal.modalState && (
        <div className="flex-center fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-40 z-50">
          <div
            ref={modalRef}
            className="flex flex-col  gap-8 w-fit p-10 bg-white flex-center rounded-lg"
          >
            <p className="text-xl font-semibold">
              Are you sure, you want to delete?
            </p>

            <div className="w-full flex justify-end gap-3">
              <button
                type="button"
                className="py-2 px-4 rounded-lg font-bold text-sm bg-gray-300"
                onClick={() => setOpenModal({...openModal, modalState: false})}
              >
                Cancel
              </button>

              <button
                type="button"
                className="py-2 px-4 text-white rounded-lg font-bold text-sm bg-red-600"
                onClick={() => {
                  const updatedCampaignsList = campaignsList.filter(
                    (item) => item.id !== openModal.campaignId
                  );
                  setOpenModal({...openModal, modalState: false})
                  updateCampaignsList(updatedCampaignsList);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              handleChangeStatus={handleChangeStatus}
              index={index}
              filteredCampaignsList={filteredCampaignsList}
              onDeleteClick = {handleOpenModal}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CampaignsList;
