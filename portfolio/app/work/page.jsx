export const dynamic = "force-dynamic";

import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import Carousel from "@/components/carousel";
import Loading from "../loading";

async function get_works() {
  const baseUrl = process.env.API_URL;

  if (!baseUrl) {
    console.warn("API_URL is undefined! Returning empty array for prerender.");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/projects`, {
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

const Work = async () => {
  const projects = await get_works();
  // if (projects.length === 0) {
  //   projects = [
  //     {
  //       title: "Rust Actix Microservice",
  //       description:
  //         "Xây dựng hệ thống Backend hiệu năng cao bằng Rust và Actix-Web. Xử lý hàng ngàn request đồng thời với mức tiêu thụ RAM chưa tới 50MB. Tích hợp kết nối an toàn với MongoDB Atlas.",
  //       href: "/project/rust-actix-backend",
  //       img_url: "https://picsum.photos/seed/rust/800/600",
  //     },
  //     {
  //       title: "K3s Cluster on Oracle Cloud",
  //       description:
  //         "Triển khai cụm Kubernetes hạng nhẹ (K3s) trên hạ tầng Oracle Cloud ARM64. Quản lý tài nguyên phần cứng tối ưu và thiết lập mạng nội bộ cách ly giữa các Namespace.",
  //       href: "/project/k3s-oracle-cloud",
  //       img_url: "https://picsum.photos/seed/k8s/800/600",
  //     },
  //     {
  //       title: "ArgoCD GitOps Pipeline",
  //       description:
  //         "Tự động hóa hoàn toàn luồng CI/CD với mô hình Pull-based GitOps. Sử dụng ArgoCD để đồng bộ trạng thái cluster trực tiếp từ GitHub Repository, loại bỏ hoàn toàn việc gõ kubectl thủ công.",
  //       href: "/project/argocd-gitops",
  //       img_url: "https://picsum.photos/seed/argocd/800/600",
  //     },
  //     {
  //       title: "Next.js SSR BFF Architecture",
  //       description:
  //         "Thiết kế giao diện người dùng Server-Side Rendering với Next.js. Áp dụng pattern Backend-For-Frontend để giấu kín API nội bộ, chống rò rỉ dữ liệu và tăng tốc độ tải trang.",
  //       href: "/project/nextjs-bff",
  //       img_url: "https://picsum.photos/seed/nextjs/800/600",
  //     },
  //     {
  //       title: "Bitnami Sealed Secrets",
  //       description:
  //         "Nâng cấp bảo mật cho Kubernetes Cluster bằng mã hóa bất đối xứng. Ẩn giấu hoàn toàn database password và API keys khỏi mã nguồn mở trên GitHub.",
  //       href: "/project/sealed-secrets",
  //       img_url: "https://picsum.photos/seed/security/800/600",
  //     },
  //     {
  //       title: "Network Reconnaissance Lab",
  //       description:
  //         "Nghiên cứu và thực hành quét lỗ hổng mạng. Sử dụng các công cụ như Nmap và Cain & Abel để phân tích topology mạng và đánh giá điểm yếu của hệ thống máy chủ.",
  //       href: "/project/cybersec-lab",
  //       img_url: "https://picsum.photos/seed/hacker/800/600",
  //     },
  //     {
  //       title: "Docker Buildx Cross-Compilation",
  //       description:
  //         "Cấu hình GitHub Actions dùng QEMU để biên dịch chéo Docker Image. Giải quyết triệt để bài toán bất đồng bộ kiến trúc CPU giữa x86_64 của CI/CD và ARM64 của máy chủ thực tế.",
  //       href: "/project/docker-buildx",
  //       img_url: "https://picsum.photos/seed/docker/800/600",
  //     },
  //     {
  //       title: "Traefik Ingress Controller",
  //       description:
  //         "Quản lý luồng traffic từ Internet đi vào K3s Cluster. Thiết lập routing rule, cấu hình chứng chỉ SSL/TLS tự động và phân giải tên miền cho các dịch vụ bên trong mạng nội bộ.",
  //       href: "/project/traefik-ingress",
  //       img_url: "https://picsum.photos/seed/network/800/600",
  //     },
  //     {
  //       title: "Dynamic Helm Templating",
  //       description:
  //         "Cấu trúc hóa toàn bộ file YAML tĩnh thành các Helm Charts độc lập. Sử dụng biến số (Values) để linh hoạt triển khai nhiều môi trường (Dev/Staging/Prod) chỉ từ một mã nguồn duy nhất.",
  //       href: "/project/helm-charts",
  //       img_url: "https://picsum.photos/seed/helm/800/600",
  //     },
  //     {
  //       title: "Zero-Trust SSH Tunnels",
  //       description:
  //         "Thiết lập hệ thống phân quyền IAM và nguyên tắc Least Privilege. Tự động hóa việc cập nhật mã nguồn giữa các repository bằng SSH Deploy Keys thay vì dùng Personal Access Tokens.",
  //       href: "/project/zero-trust",
  //       img_url: "https://picsum.photos/seed/iam/800/600",
  //     },
  //   ];
  // }

  return (
    <section className="container w-screen flex flex-col justify-center mx-auto">
      {projects.length > 5 ? (
        <div className="h-fit w-full flex relative my-10 overflow-visible">
          <Carousel data={[...projects].slice(0, 5)} r2_pub_url={process.env.R2_PUBLIC_URL} />
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
      {/* Full project */}
      <div className="flex flex-col">
        <span className="h-10 py-10 text-center font-bold text-2xl">
          {" "}
          Full projects{" "}
        </span>
        {projects.length > 0 ? (
          <div className="container mx-auto h-full py-10">
            {projects.map((service, index) => {
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col justify-center gap-6 group bg-primary-hover px-6 py-4 rounded-xl shadow hover:shadow-destructive-hover hover:shadow-lg border-b-4 border-accent hover:border-destructive-foreground hover:scale-110 transition-all mx-4 my-4"
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="text-3xl font-bold text-primary transition-all duration-500">
                      {service.title}
                    </div>
                    <Link
                      href={service.href}
                      className="min-w-[50px] min-h-[50px] rounded-full bg-accent group-hover:bg-destructive-hover transition-all duration-500 flex justify-center items-center group-hover:-rotate-45 "
                    >
                      <BsArrowDownRight className="text-primary-hover text-2xl" />
                    </Link>
                  </div>
                  <p className="text-primary font-medium whitespace-pre-wrap text-left">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
