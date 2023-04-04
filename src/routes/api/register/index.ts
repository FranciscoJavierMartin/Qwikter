import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ json, parseBody }) => {
  const { username, password, email, avatarColor, avatar } =
    (await parseBody()) as {
      username: string;
      email: string;
      password: string;
      avatarColor: string;
      avatar: string;
    };

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('email', email);
  formData.append('avatarColor', avatarColor);

  console.log('Avatar', avatar);
  const avatarImage = await (await fetch(avatar)).blob();
  formData.append('avatarImage', avatarImage);
  console.log('Blob', avatarImage);

  const response = await fetch('http://localhost:3020/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data`,
    },
    body: formData,
  });

  json(response.status, {
    ...(await response.json()),
  });
};
