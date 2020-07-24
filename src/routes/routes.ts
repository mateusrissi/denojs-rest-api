import { Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import user_controller from "../controllers/user_controller.ts";
import auth_controller from "../controllers/auth_controller.ts";

const router = new Router();

router
  .get("/users", user_controller.get_all_users)
  .get("/users/:id", user_controller.get_user)
  .post("/users", user_controller.store_user)
  .patch("/users/:id", user_controller.update_user)
  .delete("/users/:id", user_controller.delete_user);

router
  .options("/login", oakCors())
  .post("/login", oakCors(), auth_controller.login);

export default router;
