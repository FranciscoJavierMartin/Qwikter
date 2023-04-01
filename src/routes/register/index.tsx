import { component$ } from '@builder.io/qwik';
import RegisterForm from '~/components/auth/RegisterForm';
import useNonAuthRoute from '~/hooks/useNonAuthRoute';
import './register.scss';

export default component$(() => {
  useNonAuthRoute();

  return (
    <div class='page'>
      <div class='auth-form'>
        <RegisterForm />
      </div>
    </div>
  );
});
