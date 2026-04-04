import Link from "next/link"
import {FaGithub, FaLinkedin, FaMailBulk} from "react-icons/fa"

const socials = [
    {
        icon: <FaGithub/>, path: "https://github.com/hieu180230",
    },
    {
        icon: <FaLinkedin/>, path: "https://www.linkedin.com/in/nnhieu/",
    },
    {
        icon: <FaMailBulk/>, path: "mailto:hieu180230@gmail.com",
    },
]

const Social = ({container_styles, icon_styles}) => {
  return (
    <div className={container_styles}>
        {socials.map((item, index) => {
            return (
                <a key={index} href={item.path} className={icon_styles} target="_blank" rel="noopener noreferrer">
                    {item.icon}
                </a>
            );
        })}
    </div>
  );
};

export default Social;
