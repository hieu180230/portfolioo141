import Link from "next/link"
import {FaGithub, FaLinkedin, FaMailBulk} from "react-icons/fa"

const socials = [
    {
        icon: <FaGithub/>, path: "",
    },
    {
        icon: <FaLinkedin/>, path: "",
    },
    {
        icon: <FaMailBulk/>, path: "",
    },
]

const Social = ({container_styles, icon_styles}) => {
  return (
    <div className={container_styles}>
        {socials.map((item, index) => {
            return (
                <Link key={index} href={item.path} className={icon_styles}>
                    {item.icon}
                </Link>
            );
        })}
    </div>
  );
};

export default Social;
