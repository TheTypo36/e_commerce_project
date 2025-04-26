import "server-only";
import { defineLive } from "next-sanity";
import { client } from "./client";

const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;
console.log("Token:", token);

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});
