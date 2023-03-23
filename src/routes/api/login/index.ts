import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  // put your DB access here, we are hard coding a response for simplicity.

  console.log(await parseBody());
  json(200, {
    text: 'Hello world from login API',
  });
};
