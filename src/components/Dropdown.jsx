import { useState, useRef, useEffect } from "react";

const Dropdown = ({ onSelectValue, options, preSelect, placeholder, styles, imgSrc }) => {
  const [selected, setSelected] = useState(preSelect ? options[0] : placeholder);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
        if(!dropdownRef.current.contains(e.target)){
            setIsActive(false);
        }
    }
    document.addEventListener("mousedown", handler);
    return () => {
        document.removeEventListener("mousedown", handler);
    }
  }, []);

  return (
    <div className="relative min-w-[150px]" ref={dropdownRef}>
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex-between  gap-3 px-4 py-2 border-[1.5px] border-[#E9E9E9] rounded-[10px] cursor-pointer"
      >
        <span className={`${selected === placeholder ? styles : "base-regular"}`}>{selected}</span>
        <img src={`${imgSrc || "/assets/icons/caret-down-dark.svg"}`} alt="caret down" />
      </div>

      {isActive && (
        <div className="max-h-48 overflow-auto custom-scrollbar z-50 w-full bg-white absolute top-[110%] border-[1.5px] border-[#E9E9E9] rounded-[10px]">
          {options.map((option) => (
            <p key={option} onClick = {() => {
                onSelectValue(option)
                setSelected(option);
                setIsActive(false);
            }} className="py-2 px-4 cursor-pointer hover:bg-blue-100 font-medium">
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
