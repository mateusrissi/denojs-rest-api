import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import db from "../configs/database.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.3/mod.ts";

const users_collection = db.collection("user");

export default {

  async get_all_users(context: any) {
    const all_users = await users_collection.find();
    context.response.body = all_users;
  },

  async get_user(context: any) {
    const user = await users_collection.findOne({ _id: ObjectId(context.params.id) });
    context.response.body = user;
  },

  async store_user(context: any) {
    const { value } = await context.request.body();

    if (Object.keys(value).length == 0) {
      context.response.status = 400;
      context.response.body = { error: "Please, provide the required data" };
      return;
    }

    const hash = await bcrypt.hash(value.password);
    const data = { "name": value.name, "email": value.email, "password": hash }
    const insertId = await users_collection.insertOne(data);

    context.response.status = 201;
    context.response.body = insertId;
  },

  async update_user(context: any) {
    try {
      const { value } = await context.request.body();

      if (Object.keys(value).length == 0) {
        context.response.body = { message: "Nothing to do" };
        return;
      }

      const hash = await bcrypt.hash(value.password);
      const data = { "name": value.name, "email": value.email, "password": hash }

      const { matchedCount, modifiedCount, upsertedId } = await users_collection.updateOne(
        { _id: ObjectId(context.params.id) },
        { $set: data },
      );

      context.response.body = { message: "Updated" };
    } catch (e) {
      context.response.status = 404;
      context.response.body = { error: "Not found" };
    }
  },

  async delete_user(context: any) {
    const deleteCount = await users_collection.deleteOne({ _id: ObjectId(context.params.id) });

    context.response.status = 204;
  },
};
