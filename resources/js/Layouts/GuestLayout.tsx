import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="bg-primary-blue flex min-h-screen justify-center py-20 md:py-32 px-4">
            <div className=" bg-white w-full flex justify-center flex-col items-center sm:max-w-md md:max-w-xl shadow-md sm:rounded-lg">
                <div>
                    <Link href="/" className="flex flex-col items-center gap-8">
                        <ApplicationLogo className="h-40 w-40" />
                        <h1 className="text-2xl font-semibold">Monitoring Kendaraan Tambang</h1>
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4  ">
                    {children}
                </div>
            </div>
        </div>
    );
}
