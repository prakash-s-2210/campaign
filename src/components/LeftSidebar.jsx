import { sideNavbarLinks } from "../constants";

const LeftSidebar = ({ activeTab, handleTabChange }) => {
  return (
    <section className="flex flex-col items-center gap-12 h-screen bg-[#001738] py-12">
      <img src="/assets/icons/logo.svg" alt="logo" width={46} height={46} />

      <div className="flex flex-col gap-3">
        {sideNavbarLinks.map((link) => (
          <div
            key={link.label}
            onClick={() => handleTabChange(link.label)}
            className={`${
              link.label === activeTab ? "bg-[#1977f31a]" : "cursor-pointer"
            } flex  pr-[14px] items-center py-[10px]`}
          >
            <span
              className={`${
                link.label === activeTab ? "bg-[#1977f3]" : "bg-[#001738]"
              } absolute left-0 w-[5px] h-[58px] rounded-r-sm`}
            ></span>

            <div className="flex-1 flex flex-col items-center pl-[17px]">
              <img src={link.imgSrc} alt={link.label} />

              <p className="tiny-medium">{link.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
