import { useEffect } from "react";
import { X } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";

const FloatingSidebar = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) => {
    const pathName = window.location.pathname;
    const isActive = (path: string) => path === pathName;
    const user = usePage().props.auth.user;
    const isAuthenticated = user !== null;

    useEffect(() => {
        setIsOpen(false);
    }, [pathName]);

    return (
        isOpen && (
            <aside
                className={`bg-black items-center py-28 px-8 bg-gray/100 opacity-100 z-50 fixed left-0 top-0 flex xl:hidden h-screen w-[350px] flex-col bg-dark-80 shadow-xl transition-transform duration-1000 ease-in-out transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <X
                    className={`cursor-pointer font-bold text-white absolute top-14 right-4`}
                    onClick={() => setIsOpen(!isOpen)}
                    size={40}
                />
                <div className="flex flex-col gap-24">
                    <Link
                        href="/"
                        className="text-center text-3xl font-semibold text-white flex gap-4 items-center"
                    >
                        Monitoring Kendaraan
                    </Link>
                    <div className="flex flex-col gap-6 w-full">
                        {sidebarItems.map((item) => (
                            <Link
                                className="w-full"
                                href={item.link}
                                key={item.title}
                            >
                                <SecondaryButton className="xl:px-1.5 2xl:px-3 w-full flex justify-center items-center gap-2 2xl:gap-6 xl:text-sm 2xl:text-base">
                                    {item.title}
                                </SecondaryButton>
                            </Link>
                        ))}
                    </div>
                </div>
            </aside>
        )
    );
};

export default FloatingSidebar;

const sidebarItems = [
    {
        title: "Dashboard",
        link: "/dashboard",
    },
    {
        title: "Pemesanan Kendaraan",
        link: "/dashboard/vehicle-order",
    },
    {
        title: "Daftar Kendaraan",
        link: "/dashboard/vehicle",
    },
    {
        title: "Persetujuan",
        link: "/dashboard/permission",
    },
    {
        title: "Pengemudi",
        link: "/dashboard/driver",
    },
    {
        title: "Laporan",
        link: "/dashboard/report",
    },
    {
        title: "Log Aktivitas",
        link: "/dashboard/log",
    },
];
