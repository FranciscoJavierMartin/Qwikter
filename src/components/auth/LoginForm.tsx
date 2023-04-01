import { component$, useSignal, useContext } from '@builder.io/qwik';
import type { FailReturn } from '@builder.io/qwik-city';
import {
  Form,
  globalAction$,
  zod$,
  z,
  useNavigate,
} from '@builder.io/qwik-city';
import { UserContext } from '~/root';
import Button from '~/components/shared/button/Button';
import Checkbox from '~/components/shared/checkbox/Checkbox';
import Input from '~/components/shared/input/Input';
import ArrowRight from '~/components/icons/ArrowRight';
import type { RegisterResponse, UserContextState } from '~/interfaces/user';
import { KEEP_LOGGING_KEY, USERNAME_KEY } from '~/constants/localStorage';
import './AuthForm.scss';

export const useLogin = globalAction$(
  async ({ username, password }, { fail }) => {
    let res: FailReturn<{ message: string }> | RegisterResponse;

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

      if (responseBody.error) {
        res = fail(responseBody.statusCode, { message: responseBody.message });
      } else {
        res = responseBody;
      }
    } catch (e) {
      res = fail(400, { message: 'Something goes wrong' });
    }

    return res;
  },
  zod$({
    username: z.string().min(4).max(8),
    password: z.string().min(4).max(8),
  })
);

export default component$(() => {
  const username = useSignal<string>('');
  const password = useSignal<string>('');
  const keepLogging = useSignal<boolean>(false);
  const userContext = useContext<UserContextState>(UserContext);
  const navigate = useNavigate();
  const login = useLogin();

  return (
    <div class='form-container'>
      <h2>Login</h2>
      {login.value?.failed && login.value.message && (
        <div class='alert alert-error' role='alert'>
          {login.value.message}
        </div>
      )}
      <Form
        action={login}
        onSubmitCompleted$={(e) => {
          if ((e.detail.value as RegisterResponse).token) {
            userContext.user = (e.detail.value as RegisterResponse).user;
            userContext.token = e.detail.value.token!;

            if (keepLogging.value) {
              localStorage.setItem(USERNAME_KEY, username.value);
              localStorage.setItem(KEEP_LOGGING_KEY, 'true');
            } else {
              localStorage.removeItem(KEEP_LOGGING_KEY);
            }

            navigate('/social/streams');
          }
        }}
      >
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
        <Checkbox
          id='keepLogging'
          name='keepLogging'
          label='Keep me signed in'
          input={keepLogging}
        />
        <Button
          type='submit'
          variant='primary'
          disabled={login.isRunning}
          isLoading={login.isRunning}
        >
          Login
        </Button>
        <a href='/forgot-password' class='forgot-password'>
          <span>
            Forgot password?
            <ArrowRight />
          </span>
        </a>
      </Form>
      <div class='form-footer'>
        Don't have an account? <a href='/register'>Register</a>
      </div>
    </div>
  );
});
