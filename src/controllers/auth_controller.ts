import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.3/mod.ts";
import db from "../configs/database.ts";
import token from "../util/token.ts"

const users_collection = db.collection("user");

export default {
  async login(context: any) {
    const { value } = await context.request.body();

    if (! value || Object.keys(value).length == 0) {
      context.response.status = 400;
      context.response.body = { error: "Please, provide the required data" };
      return;
    }

    const user = await users_collection.findOne({ email: value.email });

    if (user == null) {
      context.response.status = 422;
      context.response.body = "Credentials does not match";
      return;
    }

    const result = await bcrypt.compare(value.password, user.password);

    if (result) {
      context.response.body = await token.generate(user._id.$oid);
    } else {
      context.response.status = 422;
      context.response.body = "Credentials does not match";
    }
  },
};
