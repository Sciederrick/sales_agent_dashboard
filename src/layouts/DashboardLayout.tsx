import { Link } from "react-router-dom";
import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";

import {
    MdOutlineDashboard,
    MdOutlineSchool,
} from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

import logoIcon1 from "./../assets/logo-1.png";
import logoIcon2 from "./../assets/logo-2.png";

import Profile from "../components/Profile";

type TypeLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<TypeLayoutProps> = ({ children }) => {
    const ctx = useContext(AppContext);
    return (
        <div className="flex justify-between bg-[#FFF]">
            <nav
                className={`min-h-screen min-w-[250px] py-4 z-20 ${
                    ctx?.showMobileNav
                        ? "absolute inset-y-0 left-0 flex flex-col gap-4 bg-[#FFF] w-2/3 lg:w-auto lg:static"
                        : "hidden"
                } lg:flex lg:flex-col lg:gap-4`}
            >
                <Link to="/" className="pb-6 px-8">
                    {ctx?.showMobileNav ? (
                        <img
                            src={logoIcon2}
                            alt="company logo"
                            className="h-10 mr-3 md:block"
                        />
                    ) : (
                        <>
                            <img
                                src={logoIcon1}
                                alt="company logo"
                                className="h-10 mr-3 md:hidden"
                            />
                            <img
                                src={logoIcon2}
                                alt="company logo"
                                className="hidden h-10 mr-3 md:block"
                            />
                        </>
                    )}
                </Link>
                <Link to="/" className="pb-2 px-8 flex items-center">
                    <MdOutlineDashboard />
                    &nbsp; Overview
                </Link>
                <Link to="/" className="flex items-center pb-2 px-8">
                    <MdOutlineSchool />
                    &nbsp; Schools&nbsp;
                    <FiChevronDown />
                </Link>
                <ul className="pl-6 flex flex-col gap-4">
                    <li>
                        <Link to="/" className="pb-2 px-8">
                            View Schools
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="pb-2 px-8">
                            Invoices
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="pb-2 px-8">
                            Collections
                        </Link>
                    </li>
                </ul>
            </nav>
            <main className="min-h-screen bg-[#F6F6F6] w-full">
                {children}
            </main>
            <aside
                className={`min-h-screen absolute inset-0 bg-[#EAF6FC] ${
                    ctx?.showProfileSideBar
                        ? "block lg:static lg:min-w-[400px]"
                        : "hidden"
                }`}
            >
                <Profile />
            </aside>
        </div>
    );
};

export default DashboardLayout;
