import React from "react";
import Link from "next/link";

const iconClasses = "h-7 w-7 fill-current";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className={iconClasses} aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .5 1.4.9s.7.8.9 1.4c.2.4.4 1 .5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.4-.9s-.7-.8-.9-1.4c-.2-.4-.4-1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.5-1 1-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0 5.7 0 4.8.2 4 .5c-.9.3-1.6.7-2.3 1.4C1 2.6.6 3.3.3 4.2.1 5 .1 5.9.1 7.2 0 8.5 0 8.9 0 12c0 3.1 0 3.5.1 4.8.1 1.3.2 2.2.5 3 .3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.7.5 3 .5 1.3.1 1.7.1 4.8.1 3.1 0 3.5 0 4.8-.1 1.3-.1 2.2-.2 3-.5.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.7.5-3 .1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.3-.2-2.2-.5-3-.3-.9-.7-1.6-1.4-2.3C21.4 1 20.7.6 19.8.3c-.8-.3-1.7-.5-3-.5C15.5 0 15.1 0 12 0Z" />
    <path d="M12 5.8a6.2 6.2 0 1 0 6.2 6.2A6.2 6.2 0 0 0 12 5.8Zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-11.2a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className={iconClasses} aria-hidden="true">
    <path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.4C0 23.4.6 24 1.3 24h11.5v-9.3H9.7V11h3.1V8.4c0-3.1 1.9-4.8 4.6-4.8 1.3 0 2.6.1 2.9.1v3.4h-2c-1.6 0-1.9.8-1.9 1.8V11h3.7l-.5 3.7h-3.2V24h6.3c.7 0 1.3-.6 1.3-1.3V1.3C24 .6 23.4 0 22.7 0Z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className={iconClasses} aria-hidden="true">
    <path d="M23.5 6.2a2.9 2.9 0 0 0-2-2C19.4 3.8 12 3.8 12 3.8s-7.4 0-9.5.4a2.9 2.9 0 0 0-2 2C0 8.3 0 12 0 12s0 3.7.5 5.8a2.9 2.9 0 0 0 2 2c2.1.4 9.5.4 9.5.4s7.4 0 9.5-.4a2.9 2.9 0 0 0 2-2c.5-2.1.5-5.8.5-5.8s0-3.7-.5-5.8ZM9.6 15.3V8.7l6.3 3.3Z" />
  </svg>
);

const SocialMedia = () => {
  return (
    <div className="flex gap-3 mt-1 text-sanctuaryTerracotta">
      <Link href="asd" aria-label="Instagram" className="transition hover:text-sanctuaryBrick">
        <InstagramIcon />
      </Link>
      <Link href="sdf" aria-label="Facebook" className="transition hover:text-sanctuaryBrick">
        <FacebookIcon />
      </Link>
      <Link href="ad" aria-label="YouTube" className="transition hover:text-sanctuaryBrick">
        <YouTubeIcon />
      </Link>
    </div>
  );
};

export default SocialMedia;
