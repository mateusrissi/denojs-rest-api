import token from "../util/token.ts"

export default {
  async authorized(context: any) {
    const auth = context.request.headers.get("authorization");

    if (!auth) {
      return false;
    }

    const header_token = auth.replace("Bearer ", "");

    const token_valid = await token.validate(header_token);

    if (token_valid == false) {
      return false;
    }

    return header_token;
  }
}
