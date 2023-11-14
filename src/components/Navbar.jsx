const Navbar = () => {
  return (
    <nav className="flex justify-end items-center pt-7 pb-4 pr-[50px] border-b border-b-[#DAE6FF]">
      <p className="subtle-regular opacity-60">Free trial ends in 2 days</p>

      <div className="flex gap-[5px] bg-[#F29A2E1A] rounded-[4px] px-[10px] ml-2">
        <img src="/assets/icons/crown.svg" alt="crown" />

        <p className="subtle-medium text-[#FF8C00]">Buy Plan</p>
      </div>

      <img src="/assets/icons/gift.svg" alt="gift" className="pl-5" />

      <img src="/assets/icons/notification.svg" alt="notification" className="pl-4" />

      <div className="pl-4 flex items-center gap-2">
        <img src="/assets/icons/company-logo.svg" alt="company logo" />

        <p className="text-[#1B3F67] text-sm">Mukund cake shop</p>

        <img src="/assets/icons/caret-down.svg" alt="caret down" />
      </div>

      <img src="/assets/icons/translate.svg" alt="translate icon" className="pl-4" />
    </nav>
  )
}

export default Navbar