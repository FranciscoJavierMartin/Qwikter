import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const body = await parseBody();

  const response = await fetch('http://localhost:3020/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  json(response.status, {
    ...(await response.json()),
  });
};
