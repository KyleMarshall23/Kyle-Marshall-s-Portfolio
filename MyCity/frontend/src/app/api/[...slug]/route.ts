import { NextRequest } from "next/server";
import { Amplify } from 'aws-amplify';
import { revalidateTag } from "next/cache";

//configure amplify for server-side rendering to enable use of Next.js api route
Amplify.configure({},
  {
    ssr: true
  });

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {

  //the request is for invalidating the cache
  if (params.slug[0] === "invalidate-cache") {
    if (params.slug.length < 2) {
      throw new Error("missing etag");
    }

    const providedEtag = params.slug[1];
    revalidateTag(providedEtag); //invalidate the cache

    return Response.json({ isCacheInvalidated: true });
  }

  //otherwise request is just a normal request
  if (!API_BASE_URL) {
    throw new Error("missing api base url");
  }

  let protocol = "https";

  if (!req.url.startsWith("https")) {
    //if request url does not start with https, then assume http protocol
    protocol = "http";
  }

  const endpointUrl = req.url.replace(`${protocol}://localhost:3000/api`, API_BASE_URL);
  const etag = params.slug.join("-");

  const res = await fetch(endpointUrl, {
    headers: req.headers,
    next: { tags: [etag] },
    cache: "force-cache"
  });

  const data = await res.json();

  return Response.json({ data });

}


export async function POST(req: NextRequest, { params }: { params: { slug: string[] } }) {

  if (!API_BASE_URL) {
    throw new Error("missing api base url");
  }

  let protocol = "https";

  if (!req.url.startsWith("https")) {
    //if request url does not start with https, then assume http protocol
    protocol = "http";
  }

  const endpointUrl = req.url.replace(`${protocol}://localhost:3000/api`, API_BASE_URL);

  const requestBody = await req.json();

  const res = await fetch(endpointUrl, {
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(requestBody)
  });

  const data = await res.json();

  return Response.json({ data });
}