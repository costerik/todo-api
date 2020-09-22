import Router from 'koa-router';
//import fs from 'fs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const routes = new Router();

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const getAppleUserIdExtractJWT = async (token?: string): Promise<any | null> => {
  const parts = token?.split('.');
  try {
    if (parts) {
      return await JSON.parse(new Buffer(parts[1], 'base64').toString('ascii'));
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

async function getClientSecret(): Promise<string> {
  let token = '';
  if (process.env.PRIVATE_KEY_FILE) {
    const time = new Date().getTime() / 1000; // Current time in seconds since Epoch
    //const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_FILE);
    const { data } = await axios(process.env.PRIVATE_KEY_FILE);

    const headers = {
      kid: process.env.KEY_ID,
      typ: undefined,
    };

    const claims = {
      iss: process.env.TEAM_ID,
      iat: time, // The time the token was generated
      exp: time + 86400 * 180, // Token expiration date
      aud: 'https://appleid.apple.com',
      sub: process.env.SERVICE_ID,
    };

    token = jwt.sign(claims, data, {
      algorithm: 'ES256',
      header: headers,
    });
  }

  return token;
}

routes.post(
  '/redirect',
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async (ctx: Router.RouterContext, next: () => any): Promise<void> => {
    try {
      console.log('BODY', ctx.request.body);
      const token = await getClientSecret();
      console.log('CLIENT SECRET TOKEN', token);
      let returnURL = '';
      let firstName = '';
      let middleName = '';
      let lastName = '';
      let email = '';
      let code = '';
      let state = '';
      let idToken = '';
      if (ctx.request.body.hasOwnProperty('user')) {
        const userData = ctx.request.body.user;
        const user = JSON.parse(userData);
        firstName = `&first_name=${user.name['firstName']}`;
        middleName = `&middle_name=${user.name['middleName']}`;
        lastName = `&last_name=${user.name['lastName']}`;
        email = `&email=${user.email}`;
      }
      if (ctx.request.body.code) {
        code = `&code=${ctx.request.body.code}`;
      }
      if (ctx.request.body.state) {
        state = `state=${ctx.request.body.state}`;
      }
      if (ctx.request.body.id_token) {
        idToken = `id_token=${ctx.request.body.id_token}`;
      }
      const clientSecret = `&client_secret=${token}`;
      returnURL = `?success=true${code}${state}${idToken}${clientSecret}${firstName}${middleName}${lastName}${email}`;
      ctx.response.redirect(returnURL);
      console.log('RESPONSE', ctx.response);
    } catch (e) {
      ctx.response.status = 400;
      ctx.response.body = { error: e.message };
      ctx.response.redirect('?success=false');
    } finally {
      await next();
    }
  }
);

routes.get(
  '/redirect',
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async (ctx: Router.RouterContext, next: () => any): Promise<void> => {
    try {
      ctx.response.status = 200;
      const data = await getAppleUserIdExtractJWT(ctx.query.id_token);
      ctx.response.body = { data: { ...ctx.query, ...data } };
    } catch (e) {
      ctx.response.status = 400;
      ctx.response.body = { error: e.message };
    } finally {
      await next();
    }
  }
);

export default routes;
