import { component$, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import Input from '~/components/shared/input/Input';
import './LoginForm.scss';

export default component$(() => {
  const username = useSignal<string>('');
  const password = useSignal<string>('');
  const keepLogging = useSignal<boolean>(false);

  return (
    <div class='form-container'>
      <h2>Login</h2>
      <Form>
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
            id='checkbox'
            type='checkbox'
            name='checkbox'
            value={keepLogging.value.toString()}
            onChange$={() => (keepLogging.value = !keepLogging.value)}
          />
          Keep me signed in
        </label>
        <button type='submit'>Login</button>
      </Form>
    </div>
  );
});
