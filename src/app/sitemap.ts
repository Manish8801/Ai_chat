import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      priority : 1,
    },
    {
      url: `${BASE_URL}/chats`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sign-up`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/log-in`,
      lastModified: new Date(),
    },
  ];
}
