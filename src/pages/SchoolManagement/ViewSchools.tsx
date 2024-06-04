import { useContext } from "react";
import Header from "./../../components/TheHeader";
import { AppContext } from "./../../contexts/AppContext";
import DashboardLayout from "./../../layouts/DashboardLayout";
import DataTableSchoolList from "./../../components/DataTableSchoolList";
import HeaderDesc from "../../components/HeaderDesc";

const SchoolManagement = () => {
    const ctx = useContext(AppContext);

    const handleClickToggleNav = () => {
        ctx?.onToggleMobileNav();
    };

    const handleClickToggleProfileSideBar = () => {
        ctx?.onToggleProfileSideBar();
    };

    return (
        <DashboardLayout>
            <Header
                title="Schools Management"
                description="Organization, viewing, and manipulation of school-related data"
                onToggleProfileSidebar={handleClickToggleProfileSideBar}
                onToggleNav={handleClickToggleNav}
            />
            <main className="pb-32 lg:pt-8">
                <div className="px-8 flex flex-col gap-4 lg:py-4 lg:px-12">
                    <HeaderDesc title="Schools" desc="List of schools with link to respective collections & invoices" />
                    <DataTableSchoolList />
                </div>
            </main>
        </DashboardLayout>
    );
}

export default SchoolManagement;