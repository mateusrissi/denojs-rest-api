import { Router, Context } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import token from "../util/token.ts";
import db from "../configs/database.ts";
import auth_middleware from "../middleware/auth.ts";

const protected_router = new Router();
const users_collection = db.collection("user");

protected_router
  .options("/me", oakCors())
  .get("/me", oakCors(), async (context: any) => {
    const authorized = await auth_middleware.authorized(context);

    if (authorized == null || authorized == false) {
      context.response.status = 401;
      context.response.body = "Unauthorized";
      return;
    }

    const token_uid = token.fetch_user_id(authorized);

    const user = await users_collection.findOne({ _id: ObjectId(token_uid) });
    context.response.body = user;
  });

export default protected_router;
