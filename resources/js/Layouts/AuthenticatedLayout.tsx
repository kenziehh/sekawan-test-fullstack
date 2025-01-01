import ApplicationLogo from "@/Components/ApplicationLogo";
import DashboardNav from "@/Components/DashboardNav";
import Dropdown from "@/Components/Dropdown";
import FloatingSidebar from "@/Components/FloatingSidebar";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Sidebar from "@/Components/Sidebar";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Toaster } from "sonner";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const isAuthenticated = user !== null;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <main className="w-full flex flex-row">
            <Toaster
                position="top-center"
                pauseWhenPageIsHidden={true}
                theme="dark"
                richColors={true}
            />
            <Sidebar />
            {/* <FloatingSidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}

            <div className="container w-[80vw] flex flex-col py-10 bg-white">
                <DashboardNav isAuthenticated={isAuthenticated} />
                {children}
            </div>
        </main>
    );
}
