import { ReactNode, createContext, useState } from "react";

type TypeAppContext = {
    showMobileNav: boolean;
    onToggleMobileNav: () => void;
    showProfileSideBar: boolean;
    onToggleProfileSideBar: () => void;
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

    return (
        <AppContext.Provider
            value={{
                showMobileNav,
                showProfileSideBar,
                onToggleMobileNav: handleToggleMobileNav,
                onToggleProfileSideBar: handleToggleProfileSideBar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
