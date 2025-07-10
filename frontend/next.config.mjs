export default {
	async rewrites() {
	  return [
		{
		  source: '/secret/:path*',
		  destination: '/secret/:path*',
		},
	  ];
	},
  };
  