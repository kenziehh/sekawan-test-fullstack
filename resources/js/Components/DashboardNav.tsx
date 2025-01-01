import React, { useState } from "react";
import FloatingSidebar from "./FloatingSidebar";
import PrimaryButton from "./PrimaryButton";
import { Link, useForm } from "@inertiajs/react";
import { Menu } from "lucide-react";
import DangerButton from "./DangerButton";
import SecondaryButton from "./SecondaryButton";

const DashboardNav = ({ isAuthenticated }: { isAuthenticated?: boolean }) => {
    const { post } = useForm();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("logout"));
    };
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
                        <SecondaryButton onClick={handleLogout}>
                            Logout
                        </SecondaryButton>
                        <div className="hidden md:flex gap-9 items-center self-end"></div>
                    </div>
                </div>
            </div>
            <FloatingSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

export default DashboardNav;
