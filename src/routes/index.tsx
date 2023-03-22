import { component$ } from '@builder.io/qwik';
import LoginForm from '~/components/auth/LoginForm';
// import './index.scss';
import './index-mobile.scss';

export default component$(() => {
  return (
    <div class='page'>
      <div class='logo-container'>
        <h1>Qwikter</h1>
      </div>
      <div class='auth-form'>
        <LoginForm />
      </div>
    </div>
  );
});
