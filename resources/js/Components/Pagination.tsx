import { PaginationLink } from "@/types/response";
import { Link } from "@inertiajs/react";

const Pagination = ({ links }: { links: PaginationLink[] }) => {
    return (
        <nav className="text-center mt-4 text-black py-10">
            {links.map((link: PaginationLink) => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-black text-xs shadow-lg" +
                        (link.active ? "bg-gray-950 " : " ") +
                        (!link.url
                            ? "!text-gray-500 cursor-not-allowed "
                            : "hover:bg-gray-950 hover:text-white")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
};

export default Pagination;
