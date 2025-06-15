"use server"

import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"
import Social from "@/components/social";
import Photo from "@/components/photo";
import Loading from "./loading";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center xl:pt-8 xl:bp-24 justify-between">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">TITLE</span>
            <h1 className="h1">
              Hello I'm<br /> <span className="text-accent">Name name</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-primary">
              Sun Minus used Explosion! Critical damage! x2 damage!
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                <span>CV Download</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social container_styles="flex gap-6" icon_styles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary-hover hover:transition-all duration-500" />
              </div>
            </div>
          </div>

          <div className="order-1 xl:order-none mb-8 xl:mb-0 w-auto">
            <Loading/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
