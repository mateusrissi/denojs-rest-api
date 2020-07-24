import { validateJwt, validateJwtObject, parseAndDecode } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

const key = env.JWT_SECRET;

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  async generate(user_id: any) {
    const payload: Payload = {
      uid: user_id,
      exp: setExpiration(new Date().getTime() + 60000 * 15),
    };

    return await makeJwt({ header, payload, key });
  },

  async validate(jwt: any) {
    const token_info = await validateJwt({ jwt, key, algorithm: "HS256" })
    return token_info.isValid;
  },

  fetch_user_id(token: any) {
    const token_info_string = JSON.stringify(parseAndDecode(token));
    return JSON.parse(token_info_string).payload.uid;
  }
}
