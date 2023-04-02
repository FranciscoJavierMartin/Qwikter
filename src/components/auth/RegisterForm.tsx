import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
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
import { generateAvatar } from '~/utils/colors';

const registrationFormValidation = z
  .object({
    username: z.string().min(4).max(8),
    password: z.string().min(4).max(8),
    confirmPassword: z.string().min(4).max(8),
    email: z.string().email(),
    avatar: z.string(),
  })
  .refine((o) => o.confirmPassword === o.password, {
    message: 'Password fields do not match',
  });

export const useRegister = globalAction$(
  async ({ username, password, email, avatar }, { fail }) => {
    // let res: FailReturn<{ message: string }> | RegisterResponse;
    // if (password !== confirmPassword) {
    //   res = fail(400, { message: "Passwords don't match" });
    // } else {
    //   try {
    //     const response = await fetch('http://localhost:5173/api/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         username,
    //         password,
    //       }),
    //     });
    //     const responseBody = await response.json();
    //     if (responseBody.error) {
    //       res = fail(responseBody.statusCode, {
    //         message: responseBody.message,
    //       });
    //     } else {
    //       res = responseBody;
    //     }
    //   } catch (e) {
    //     res = fail(400, { message: 'Something goes wrong' });
    //   }
    // }
    // return res;
  },
  zod$(registrationFormValidation)
);

export default component$(() => {
  const username = useSignal<string>('');
  const email = useSignal<string>('');
  const password = useSignal<string>('');
  const confirmPassword = useSignal<string>('');
  const keepLogging = useSignal<boolean>(false);
  const imgSrc = useSignal<string>('');
  const register = useRegister();

  useVisibleTask$(({ track }) => {
    track(username);

    if (username.value) {
      imgSrc.value = generateAvatar(username.value.charAt(0).toUpperCase());
    }
  });

  return (
    <div class='form-container'>
      <h2>Register</h2>
      {register.value?.failed && register.value?.formErrors?.length && (
        <div class='alert alert-error' role='alert'>
          {register.value?.formErrors?.join(',')}
        </div>
      )}
      {imgSrc.value && (
        <img src={imgSrc.value} alt='no image' width={200} height={200} />
      )}
      <Form action={register}>
        <input type='hidden' bind:value={imgSrc} name='avatar' />
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
