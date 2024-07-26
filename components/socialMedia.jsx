import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";

const SocialMedia = () => {
  return (
    <div className="flex gap-3 mt-1 ml-[-3px] transition-transform duration-300">
      <Link href={"asd"}>
        <InstagramIcon className="text-3xl hover:scale-110" />
      </Link>
      <Link href={"sdf"}>
        <FacebookIcon className="text-3xl hover:scale-110" />
      </Link>
      <Link href={"ad"}>
        <YouTubeIcon className="text-3xl hover:scale-110" />
      </Link>
    </div>
  );
};

export default SocialMedia;
