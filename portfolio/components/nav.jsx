
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "blog",
        path: "/blog",
    },
    {
        name: "contact",
        path: "/contact",
    },
    {
        name: "work",
        path: "/work",
    },
    {
        name: "resume",
        path: "/resume",
    },
]

const Nav = () => {
    const path_name = usePathname();
    return <nav className="flex gap-8"> {links.map((link, index) => {
        return <Link
            href={link.path}
            key={index}
            className={`${link.path === path_name && "text-primary border-b-3 border-accent"} px-2 py-2 rounded-md capitalize font-medium shadow-md hover:shadow-md hover:shadow-accent transition-all`}
        >
            {link.name}
        </Link>
    })} </nav>;
};

export default Nav;