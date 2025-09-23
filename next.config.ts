import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
	  remotePatterns: [
	      { protocol: 'https', hostname: 'ac.goit.global' },
		  { protocol: 'https', hostname: 'www.gravatar.com' },
		  { protocol: 'https', hostname: 'res.cloudinary.com' }
	    ]
	}
};

export default nextConfig;
