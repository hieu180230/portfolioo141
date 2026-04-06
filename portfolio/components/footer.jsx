import Social from "@/components/social";

const Footer = () => {
  return (
    <footer className="py-4 text-accent-alt footer bg-primary opacity-0 hover:opacity-90 transition-opacity">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-accent-alt">
              SUN
            </h2>
            <p className="text-white/80 max-w-[400px] text-sm">
              Cybersecurity student & DevOps enthusiast. <br/> Solving problems one
              line of code at a time.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-accent-alt font-bold text-xl tracking-widest">
              Get in touch
            </span>
            <a
              href="mailto:hieu180230@gmail.com"
              className="text-sm text-accent-alt/80 hover:text-white transition-colors duration-300 lowercase font-mono"
            >
              hieu180230@gmail.com
            </a>
            <a
              className="text-sm text-accent-alt/80 hover:text-white transition-colors duration-300 lowercase font-mono"
            >
              +84 359 772 230
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <span className="text-accent-alt font-bold text-xl tracking-widest">
              Follow Me
            </span>
            <Social
              container_styles="flex gap-4"
              icon_styles="w-10 h-10 border border-accent/80 rounded-full flex justify-center items-center text-accent-alt hover:bg-accent hover:text-primary transition-all duration-500"
            />
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/50 text-center mt-5">
          <p className="text-white text-xs pt-2">
            &copy; {new Date().getFullYear()} Nguyen Nhat Hieu. All rights
            reserved.
            <span className="ml-2 italic opacity-50">
              Built with Next.js & Rust.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
