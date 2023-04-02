import { component$, useSignal } from '@builder.io/qwik';
import {
  FailReturn,
  Form,
  globalAction$,
  zod$,
  z,
} from '@builder.io/qwik-city';
import type { RegisterResponse } from '~/interfaces/user';
import Button from '~/components/shared/button/Button';
import Input from '~/components/shared/input/Input';
import PasswordInput from '~/components/shared/password-input/PasswordInput';
import './AuthForm.scss';

const registrationFormValidation = z
  .object({
    username: z.string().min(4).max(8),
    password: z.string().min(4).max(8),
    confirmPassword: z.string().min(4).max(8),
    email: z.string().email(),
  })
  .refine((o) => o.confirmPassword === o.password, {
    message: 'Password fields do not match',
  });

export const useRegister = globalAction$(
  async ({ username, password, email }, { fail }) => {
    let res: FailReturn<{ message: string }> | RegisterResponse;

    try {
      const response = await fetch('http://localhost:5173/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          avatarColor: 'blue',
        }),
      });

      const responseBody = await response.json();

      if (responseBody.error) {
        res = fail(responseBody.statusCode, {
          message: responseBody.message,
        });
      } else {
        res = responseBody;
      }
    } catch (e) {
      res = fail(400, { message: 'Something goes wrong' });
    }

    return res;
  },
  zod$(registrationFormValidation)
);

export default component$(() => {
  const username = useSignal<string>('Test');
  const email = useSignal<string>('test@test.com');
  const password = useSignal<string>('test');
  const confirmPassword = useSignal<string>('test');
  const keepLogging = useSignal<boolean>(false);
  const register = useRegister();

  return (
    <div class='form-container'>
      <h2>Register</h2>
      {register.value?.failed && register.value?.formErrors?.length && (
        <div class='alert alert-error' role='alert'>
          {register.value?.formErrors?.join(',')}
        </div>
      )}
      <Form
        action={register}
        onSubmitCompleted$={(e) => {
          console.log('Success', e.detail.value as RegisterResponse);
        }}
      >
        <Input
          id='username'
          name='username'
          type='text'
          placeholder='Username'
          value={username}
          label='Username'
          errorMessage={register.value?.fieldErrors?.username}
        />
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          label='Email'
          errorMessage={register.value?.fieldErrors?.email}
        />
        <PasswordInput
          id='password'
          name='password'
          placeholder='Password'
          value={password}
          label='Password'
          errorMessage={register.value?.fieldErrors?.password}
        />
        <PasswordInput
          id='confirmPassword'
          name='confirmPassword'
          placeholder='Confirm password'
          value={confirmPassword}
          label='Confirm password'
          errorMessage={register.value?.fieldErrors?.confirmPassword}
        />
        <Button
          type='submit'
          variant='primary'
          disabled={register.isRunning}
          isLoading={register.isRunning}
        >
          Register
        </Button>
      </Form>
      <div class='form-footer'>
        Have an account? <a href='/login'>Login</a>
      </div>
    </div>
  );
});
