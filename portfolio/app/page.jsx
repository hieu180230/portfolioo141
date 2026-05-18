import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/social";
import Photo from "@/components/photo";
// import dynamic from "next/dynamic";
import Summary from "@/components/summary";
import Carousel from "@/components/carousel";
import Loading from "./loading";

// const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
//   ssr: false,
// });

async function get_resume_items() {
  const baseUrl = process.env.API_URL || "http://localhost:8000";

  if (!baseUrl) {
    console.warn("API_URL is undefined! Returning empty array for prerender.");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/resumes`, {
      cache: "no-store",
      next: { tags: ["blogs"] },
    });

    if (!res.ok) throw new Error("Backend collapsed");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function get_blogs() {
  const baseUrl = process.env.API_URL || "http://localhost:8000";

  if (!baseUrl) {
    console.warn("API_URL is undefined! Returning empty array for prerender.");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/blogs`, {
      cache: "no-store",
      next: { tags: ["blogs"] },
    });

    if (!res.ok) throw new Error("Backend collapsed");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Home = async () => {
  const resumes = await get_resume_items();
  const projects = await get_blogs();

  const graphData = {
    nodes: [
      { id: "k3s", name: "K3s Control", radius: 12, color: "#9966CC" },
      { id: "next", name: "Next.js", radius: 10, color: "#3b82f6" },
      { id: "rust", name: "Rust API", radius: 10, color: "#f97316" },
      { id: "db", name: "Database", radius: 6, color: "#22c55e" },
      { id: "umami", name: "Umami", radius: 6, color: "#ec4899" },
      { id: "prometheus", name: "Prometheus", radius: 10, color: "#ab2810" },
      { id: "grafana", name: "Grafana", radius: 6, color: "#f0c917" },
    ],
    links: [
      { source: "k3s", target: "next", type: "infra" },
      { source: "k3s", target: "rust", type: "infra" },
      { source: "k3s", target: "prometheus", type: "data", color: "#9966CC" },
      { source: "next", target: "umami", type: "data", color: "#3b82f6" },
      { source: "db", target: "rust", type: "data", color: "#22c55e" },
      { source: "rust", target: "next", type: "data", color: "#f97316" },
      {
        source: "prometheus",
        target: "grafana",
        type: "data",
        color: "#f22e03",
      },
    ],
  };

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row xl:bp-24 justify-center gap-60 my-10">
          <div className="text-center xl:text-left order-0 xl:order-none w-full py-10">
            <span className="text-xl italic">But it works on my machine!</span>
            <h1 className="h1">
              Hello I'm
              <br /> <span className="text-accent">Nguyen Nhat Hieu</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-primary">
              Sun Minus used Depressive Coding! Critical hit!
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <FiDownload className="text-xl" />
                <a
                  href="https://pub-b4c7a5ad511a4c668ed49987987a8fe5.r2.dev/resume/NguyenNhatHieu-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CV Download
                </a>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  container_styles="flex gap-6"
                  icon_styles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary-hover hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="flex-grow w-full">
            <Summary resumes={resumes} />
          </div>

          {/* Architectural Graph */}
          {/* <div className="relative border-2 rounded-md order-1 xl:order-none xl:w-1/2 flex-row justify-center items-center h-[500px] w-full cursor-grab active:cursor-grabbing text-center">
            <div className="relative inset-0 w-fit order-0">
              <ForceGraph2D
                graphData={graphData}
                // linkDirectionalArrowLength={4}
                // linkDirectionalArrowRelPos={0.75}
                width={768}
                height={500}
                backgroundColor="rgba(0,0,0,0)"
                linkDirectionalParticles={(link) =>
                  link.type === "data" ? 4 : 0
                }
                linkDirectionalParticleSpeed={0.015}
                linkDirectionalParticleWidth={3}
                linkColor={(link) =>
                  link.type === "infra" ? "rgba(153,102,204,1)" : link.color
                }
                linkWidth={(link) => (link.type === "infra" ? 1 : 1)}
                linkLineDash={(link) => (link.type === "infra" ? [] : [5, 5])}
                // Thuật toán vẽ Custom Node lên Canvas
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const label = node.name;
                  const fontSize = 14 / globalScale;

                  // Vẽ hình tròn
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI, false);
                  ctx.fillStyle = node.color;
                  ctx.fill();

                  // Vẽ chữ nằm dưới hình tròn
                  ctx.font = `bold ${fontSize}px "Courier New", monospace`;
                  ctx.textAlign = "center";
                  ctx.textBaseline = "top";
                  ctx.fillStyle = "#888888"; // Màu chữ
                  ctx.fillText(label, node.x, node.y + node.radius + 4);
                }}
              />
            </div>
            <span className="m-5 order-1 relative">
              This is what happen in the background right now. <br /> As you can
              guess, I host this portfolio myself.{" "}
            </span>
          </div> */}
        </div>
        {projects.length > 5 ? (
          <div className="h-fit w-full flex relative m-10 overflow-visible">
            <Carousel
              data={[...projects].slice(0, 5)}
              r2_pub_url={process.env.R2_PUBLIC_URL}
            />
          </div>
        ) : (
          <div>
            <Loading desc="Project Carousel is temporarily unavailable!" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
