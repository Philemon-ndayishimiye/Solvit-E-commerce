
import { CiLogout } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";


export default function Logout() {
  const token = localStorage.getItem("token");

  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  const handleLogin = () => {
    Navigate("/login");
  };
  return (
    <div className="z-50">
      <div className="bg-gray-700 flex flex-col gap-[20px] px-[20px] py-[20px]">
        <div
          onClick={handleLogin}
          className={`flex gap-4 cursor-pointer hover:bg-amber-400 px-3 py-1 ${
            token ? "hidden" : "block"
          }  `}
        >
          <CgProfile className="text-white" />
          <h1 className="font-bold">Login</h1>
        </div>
        <div
          className={`flex gap-4 cursor-pointer hover:bg-amber-400 px-3 py-1 ${
            token ? "block" : "hidden"
          } `}
        >
          <IoIosSettings className="text-white" />
          <h1 className="font-bold">Settings</h1>
        </div>

        <Link to="/login">
          <div
            onClick={handleLogout}
            className={`flex gap-4 cursor-pointer hover:bg-amber-400 px-3 py-1 ${
              token ? "block" : "hidden"
            } `}
          >
            <CiLogout className="text-white" />
            <h1 className="font-bold">Logout</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
