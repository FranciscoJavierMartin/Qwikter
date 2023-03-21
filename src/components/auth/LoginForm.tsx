import { component$, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import Input from '~/components/shared/input/Input';
import './LoginForm.scss';

export default component$(() => {
  const username = useSignal('hello');

  return (
    <div class='login-form'>
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
        <input
          type='text'
          value={username.value}
          onInput$={(event) => {
            username.value = (event.target as any).value;
          }}
        />
        {/* <input type='text' bind:value={username} /> */}
        <button type='submit'>Login</button>
      </Form>
    </div>
  );
});
