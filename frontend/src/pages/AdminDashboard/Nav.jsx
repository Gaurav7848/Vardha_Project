import { Bell, UserCircle, Search } from "lucide-react";

const TopNavbar = ({ onProfileClick }) => {
  return (
    <nav className="w-full h-16 bg-white/80 backdrop-blur-md border-b border-[#E7E5E4] flex items-center justify-between px-8 sticky top-0 z-50">
      
      {/* LEFT: Branding */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg  font-bold tracking-widest text-stone-900">
          <>Admin <span className="text-red-700">Dashboard</span></>
        </h2>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        
       

        

        {/* Profile Button */}
        <button
          className="flex items-center gap-3 pl-2 py-1 pr-1 rounded-full cursor-pointer hover:bg-stone-300 bg-stone-200 transition-all"
          // Yahan navigate ki jagah prop function call hoga
          onClick={onProfileClick}
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-stone-800">Admin User</p>
            {/* <p className="text-[10px] text-stone-500">Super Admin</p> */}
          </div>
          <UserCircle className="text-stone-800" size={32} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;