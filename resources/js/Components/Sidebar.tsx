import { Link, usePage } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const Sidebar = () => {
    const pathName = window.location.pathname;
    //   useEffect(() => {
    //     setIsOpen(false);
    //   }, [pathName]);
    const role = usePage().props.auth.user.role;
    const isActive = (path: string) => {
        if (path === pathName) {
            return true;
        } else {
            return false;
        }
    };
    return (
        <aside className="bg-black w-full xl:w-[25vw] 2xl:w-[20vw] bg-gray min-h-screen p-14 hidden xl:flex flex-col gap-12">
            <div className="flex flex-col gap-24">
                <Link
                    href="/"
                    className="text-center text-xl 2xl:text-3xl font-semibold text-white flex gap-4 justify-center items-center"
                >
                    {/* Monitoring Kendaraan */}
                    {role === "admin" ? "Admin" : "Approver"}
                </Link>
                <div className="flex flex-col gap-6 w-full">
                    {role === "admin"
                        ? sidebarItems.admin.map((item) => {
                              return (
                                  <Link
                                      className={`w-full `}
                                      href={item.link}
                                      key={item.title}
                                  >
                                      {isActive(item.link) ? (
                                          <PrimaryButton className="xl:px-1.5 2xl:px-3 w-full flex justify-center items-center gap-2 2xl:gap-6 xl:text-sm 2xl:text-base">
                                              {item.title}
                                          </PrimaryButton>
                                      ) : (
                                          <SecondaryButton className="xl:px-1.5 2xl:px-3 w-full flex justify-center items-center gap-2 2xl:gap-6 xl:text-sm 2xl:text-base">
                                              {item.title}
                                          </SecondaryButton>
                                      )}
                                  </Link>
                              );
                          })
                        : sidebarItems.approver.map((item) => {
                              return (
                                  <Link
                                      className={`w-full`}
                                      href={item.link}
                                      key={item.title}
                                  >
                                      {isActive(item.link) ? (
                                          <PrimaryButton className="xl:px-1.5 2xl:px-3 w-full flex justify-center items-center gap-2 2xl:gap-6 xl:text-sm 2xl:text-base">
                                              {item.title}
                                          </PrimaryButton>
                                      ) : (
                                          <SecondaryButton className="xl:px-1.5 2xl:px-3 w-full flex justify-center items-center gap-2 2xl:gap-6 xl:text-sm 2xl:text-base">
                                              {item.title}
                                          </SecondaryButton>
                                      )}
                                  </Link>
                              );
                          })}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

const sidebarItems = {
    approver: [
        {
            title: "Daftar Permintaan",
            link: "/dashboard/approver",
        },
    ],
    admin: [
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
    ],
};
