import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";

import {
    MdOutlineDashboard,
    MdOutlineSchool,
} from "react-icons/md";

import logoIcon1 from "./../assets/logo-1.png";
import logoIcon2 from "./../assets/logo-2.png";

import Profile from "../components/Profile";

type TypeLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout: React.FC<TypeLayoutProps> = ({ children }) => {
    const ctx = useContext(AppContext);
    const navTransitionClasses = `transition duration-200 ease-in-out transform ${
        ctx?.showMobileNav ? "-translate-x-0" : "-translate-x-full"
    }`;
    return (
        <div className="relative flex justify-between bg-[#FFF]">
            <nav
                className={`min-h-screen min-w-[250px] py-4 z-20 absolute inset-y-0 left-0 flex flex-col gap-4 bg-[#FFF] w-2/3 lg:w-auto lg:static ${navTransitionClasses} lg:translate-x-0`}
            >
                <NavLink to="/" className="pb-6 px-8">
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
                </NavLink>
                <NavLink
                    to="/"
                    className="py-1 px-8 flex items-center hover:bg-gray-100"
                    style={({ isActive }) => {
                        return isActive
                            ? { background: "rgb(229, 231, 235)" }
                            : {};
                    }}
                >
                    <MdOutlineDashboard />
                    &nbsp; Dashboard Overview
                </NavLink>
                <NavLink
                    title="under construction"
                    to="/schools"
                    className="flex items-center py-1 px-8 hover:bg-gray-100"
                    style={({ isActive }) => {
                        return isActive
                            ? { background: "rgb(229, 231, 235)" }
                            : {};
                    }}
                >
                    <MdOutlineSchool />
                    &nbsp; School Management
                </NavLink>
                <ul className="pl-6 flex flex-col gap-4 text-sm">
                    <li className="flex w-full">
                        <NavLink
                            title="under construction"
                            to="/schools"
                            className="py-1 px-8 w-full hover:bg-gray-100"
                            style={({ isActive }) => {
                                return isActive
                                    ? { background: "rgb(241, 243, 247)" }
                                    : {};
                            }}
                        >
                            View Schools
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <main className="min-h-screen bg-[#F6F6F6] w-full">{children}</main>
            <aside
                className={`z-10 min-h-screen absolute inset-0 bg-[#EAF6FC] ${
                    ctx?.showProfileSideBar
                        ? "block lg:w-[400px] lg:inset-auto lg:right-0 lg:inset-y-0 lg:shadow"
                        : "hidden"
                }`}
            >
                <Profile />
            </aside>
        </div>
    );
};

export default DashboardLayout;
