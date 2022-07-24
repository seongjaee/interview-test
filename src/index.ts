/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const url = `https://api.notion.com/v1`;
const headers = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": "2022-02-22",
  "content-type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,init",
};

async function gatherResponse(response: Response) {
  return JSON.stringify(await response.json());
}

async function handleRequest() {
  const init = {
    method: "POST",
    headers,
  };
  const response = await fetch(url + `/databases/${DATABASE_ID}/query`, init);
  const results = await gatherResponse(response);
  return new Response(results, init);
}

async function handlePostRequest(request: Request) {
  const req = await request.json();
  const data = {
    parent: { database_id: DATABASE_ID },
    properties: req,
  };
  const init = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  const response = await fetch(url + `/pages`, init);
  if (response.status === 200) {
    return new Response(`Success`);
  } else {
    return new Response(`Failed`);
  }
}

addEventListener("fetch", (event) => {
  const { request } = event;
  console.log(request);

  if (request.method === "POST") {
    return event.respondWith(handlePostRequest(request));
  } else if (request.method === "GET") {
    return event.respondWith(handleRequest());
  }
  return event.respondWith(handleRequest());
});
