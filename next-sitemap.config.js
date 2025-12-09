/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.coughmonitor.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [],
  additionalPaths: async () => [{ loc: "/" }, { loc: "/privacy-policy" }],
};
