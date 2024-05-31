import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import DashboardLayout from "../layouts/DashboardLayout";

import { AppContext } from "../contexts/AppContext";

import logoIcon1 from "./../assets/logo-1.png";
import avatar from "./../assets/profile.webp";
import { FiChevronDown } from "react-icons/fi";

const Overview = () => {
    const ctx = useContext(AppContext);

    const handleClickToggleNav = () => {
        ctx?.onToggleMobileNav();
    }

    const handleClickToggleProfileSideBar = () => {
        ctx?.onToggleProfileSideBar();
    }
    
    return (
        <DashboardLayout>
            <header className="flex justify-between items-start pt-3 bg-[#FFF] px-4 lg:bg-transparent lg:justify-end">
                <Link to="/" className="pb-6 lg:hidden">
                    <img src={logoIcon1} alt="company logo" className="h-8" />
                </Link>
                <button
                    className={`flex items-center ${ctx?.showProfileSideBar ? 'hidden' : 'block'}`}
                    onClick={() => handleClickToggleProfileSideBar()}
                >
                    <div className="rounded-full border border-[#36893A] p-[2px] lg:mr-1">
                        <img
                            src={avatar}
                            alt="user avatar"
                            className="h-9 w-9 rounded-full object-cover border border-[#36893A] lg:h-8 lg:w-8"
                        />
                    </div>
                    <div className="hidden lg:flex lg:items-center">
                        &nbsp;
                        {"Derrick Mbarani"}
                        &nbsp;
                        <FiChevronDown />
                    </div>
                </button>
                <button
                    onClick={() => handleClickToggleNav()}
                    className="lg:hidden"
                >
                    <MdMenu size={40} color="#2C3539" />
                </button>
            </header>
        </DashboardLayout>
    );
};

export default Overview;
