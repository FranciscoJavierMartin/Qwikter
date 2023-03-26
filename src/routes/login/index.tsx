import { component$ } from '@builder.io/qwik';
import LoginForm from '~/components/auth/LoginForm';
import useNonAuthRoute from '~/hooks/useNonAuthRoute';
import './login.scss';

export default component$(() => {
  useNonAuthRoute();

  return (
    <div class='page'>
      <div class='auth-form'>
        <LoginForm />
      </div>
    </div>
  );
});
