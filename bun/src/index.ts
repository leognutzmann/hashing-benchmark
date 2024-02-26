import { Elysia } from "elysia";

const app = new Elysia()
  .post("/", ({ body }) => {
    const hash = new Bun.CryptoHasher("sha256")
      .update(JSON.stringify(body) + Math.floor(Math.random() * Date.now()))
      .digest("hex");
    console.log(hash);
    return hash;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
