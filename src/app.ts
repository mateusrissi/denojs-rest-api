import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from "./routes/routes.ts";
import protected_router from "./routes/protected.ts";

// deno run --allow-net --allow-write --allow-read --allow-plugin --unstable src/app.ts
// ../.deno/bin/denon.cmd run --allow-net --allow-write --allow-read --allow-plugin --unstable src/app.ts

const app = new Application();
const env = config();

app.use(oakCors());
app.use(router.routes());
app.use(protected_router.routes());

const HOST = env.APP_HOST || "http://localhost";
const PORT = +env.APP_PORT || 4000;

console.log(`server is started at ${HOST}:${PORT}`)
await app.listen({ port: PORT });
