/* eslint-disable @typescript-eslint/no-explicit-any */
export default function handler(_req: any, res: any) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok" }));
}
