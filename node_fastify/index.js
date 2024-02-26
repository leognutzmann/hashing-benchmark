const fastify = require("fastify")();
const crypto = require("crypto");

fastify.post("/", (request, reply) => {
  const hash = crypto
    .createHash("sha256")
    .update(
      JSON.stringify(request.body) + Math.floor(Math.random() * Date.now()),
    )
    .digest("hex");
  console.log(hash);
  reply.send(hash);
});

fastify.listen(3000, (_err) => {
  console.log(`🦊 Fastify is running at http://localhost:3000`);
});
