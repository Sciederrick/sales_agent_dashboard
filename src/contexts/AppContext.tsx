import { ReactNode, createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TypeAppContext = {
    showMobileNav: boolean;
    onToggleMobileNav: () => void;
    showProfileSideBar: boolean;
    onToggleProfileSideBar: () => void;
    onNotif: (msg:string) => void;
};

export const AppContext = createContext<TypeAppContext | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [showMobileNav, toggleMobileNav] = useState(false);
    const handleToggleMobileNav = () => {
        toggleMobileNav(!showMobileNav);
    };

    const [showProfileSideBar, toggleProfileSideBar] = useState(false);
    const handleToggleProfileSideBar = () => {
        toggleProfileSideBar(!showProfileSideBar);
    };

    const handleNotif = (msg:string) => {
        toast(msg);
    }

    return (
        <AppContext.Provider
            value={{
                showMobileNav,
                showProfileSideBar,
                onToggleMobileNav: handleToggleMobileNav,
                onToggleProfileSideBar: handleToggleProfileSideBar,
                onNotif: handleNotif
            }}
        >
            {children}
            <ToastContainer />
        </AppContext.Provider>
    );
};
