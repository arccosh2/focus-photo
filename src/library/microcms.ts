import { createClient } from "microcms-js-sdk";

type Tag =
  | "mountain"
  | "ocean"
  | "animal"
  | "spring"
  | "summer"
  | "autumn"
  | "winter"
  | "countryside"
  | "trip"
  | "other";

export interface Visual {
  id: string;
  title: string;
  photo: {
    url: string;
    width: string;
    height: string;
  };
  caption: string;
  year: number;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

interface VisualsResponse {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Visual[];
}

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export const getVisuals = async () => {
  return await client.get<VisualsResponse>({
    endpoint: "visuals",
    queries: { limit: 100 },
  });
};
