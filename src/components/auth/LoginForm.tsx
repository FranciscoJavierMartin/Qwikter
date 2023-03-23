import { component$, useSignal } from '@builder.io/qwik';
import { Form, globalAction$, zod$, z } from '@builder.io/qwik-city';
import Input from '~/components/shared/input/Input';
import ArrowRight from '~/components/icons/ArrowRight';
import './LoginForm.scss';

export const useLogin = globalAction$(
  async ({ username, password }) => {
    try {
      const test = await fetch('http://localhost:5173/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log(await test.json());
    } catch (e) {
      console.log(e);
    }

    return {
      success: true,
      userID: '',
    };
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
      <Form action={login}>
        {login.value?.failed && <p>{login.value.fieldErrors?.password}</p>}
        <Input
          id='username'
          type='text'
          name='username'
          placeholder='Username'
          value={username.value}
          label='Username'
          onInput$={(event: Event) => {
            username.value = (event.target as any).value;
          }}
        />
        <Input
          id='password'
          type='password'
          name='password'
          placeholder='Password'
          value={password.value}
          label='Password'
          onInput$={(event: Event) => {
            password.value = (event.target as any).value;
          }}
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
        <button type='submit'>Login</button>
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
