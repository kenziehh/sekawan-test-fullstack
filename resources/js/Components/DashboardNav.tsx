import React, { useState } from "react";
import FloatingSidebar from "./FloatingSidebar";
import PrimaryButton from "./PrimaryButton";
import { Link } from "@inertiajs/react";
import { Menu } from "lucide-react";

const DashboardNav = ({ isAuthenticated }: { isAuthenticated?: boolean }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <div className="py-10 flex justify-between">
                <div>
                    <Menu
                        size={40}
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer font-bold text-black xl:hidden"
                    />
                </div>
                <div>
                    <div className="flex gap-6 items-center ">
                        {isAuthenticated ? (
                            <Link href={"/logout"}>
                                <PrimaryButton className="rounded-[36px]">
                                    Sign Out
                                </PrimaryButton>
                            </Link>
                        ) : (
                            <Link href={"/login"}>
                                <PrimaryButton className="rounded-[36px]">
                                    Sign In
                                </PrimaryButton>
                            </Link>
                        )}
                        <div className="hidden md:flex gap-9 items-center self-end"></div>
                    </div>
                </div>
            </div>
            <FloatingSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default DashboardNav;
