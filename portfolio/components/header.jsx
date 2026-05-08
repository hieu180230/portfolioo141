import Link from "next/link"
import { Button } from "./ui/button"

//component
import Nav from "./nav"
import MobileNav from "./mobile_nav"
import Photo from "@/components/photo";

const Header = () => {
    return (
        <header className="py-8 xl:py-12 text-primary header">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="w-full relative h-full justify-center items-center">
                    <Photo/>
                </Link>

                {/* desktop nav*/}
                <div className="hidden xl:flex items-center gap-8">
                    <Nav />
                    <Link href="https://github.com/hieu180230" target="_blank" rel="noreferrer">
                        <Button>Underconstruction!</Button>
                    </Link>
                </div>

                {/* mobile nav */}
                <div className="xl:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header