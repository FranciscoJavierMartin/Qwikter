import { component$, useSignal, noSerialize } from '@builder.io/qwik';
import { Form, globalAction$, zod$, z } from '@builder.io/qwik-city';
import Input from '~/components/shared/input/Input';
import ArrowRight from '~/components/icons/ArrowRight';
import './LoginForm.scss';

export const useLogin = globalAction$(
  async ({ username, password }, { fail, redirect }) => {
    try {
      const response = await fetch('http://localhost:5173/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const responseBody = await response.json();

      // TODO: One single return
      if (responseBody.error) {
        return fail(responseBody.statusCode, { message: responseBody.message });
      } else {
        return noSerialize(redirect(302, '/social/streams'));
      }
    } catch (e) {
      console.log('Error', e);
    }
  },
  zod$({
    username: z.string().min(4).max(8),
    password: z.string().min(4).max(8),
    keepLogging: z.coerce.boolean().optional(),
  })
);

export default component$(() => {
  const username = useSignal<string>('');
  const password = useSignal<string>('');
  const keepLogging = useSignal<boolean>(false);
  const login = useLogin();

  return (
    <div class='form-container'>
      <h2>Login</h2>
      {login.value?.failed && (
        <div class='alert alert-error' role='alert'>
          {login.value.message}
        </div>
      )}
      <Form action={login}>
        <Input
          id='username'
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          label='Username'
          errorMessage={login.value?.fieldErrors?.username}
        />
        <Input
          id='password'
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          label='Password'
          errorMessage={login.value?.fieldErrors?.password}
        />
        <label for='checkbox' class='checkmark-container'>
          <input
            id='keepLogging'
            type='checkbox'
            name='keepLogging'
            value={keepLogging.value.toString()}
            onChange$={() => (keepLogging.value = !keepLogging.value)}
          />
          Keep me signed in
        </label>
        <button type='submit' disabled={login.isRunning}>
          Login
        </button>
        <a href='/forgot-password' class='forgot-password'>
          <span>
            Forgot password?
            <ArrowRight />
          </span>
        </a>
      </Form>
    </div>
  );
});
