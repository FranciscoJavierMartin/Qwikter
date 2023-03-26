import { component$ } from '@builder.io/qwik';
import useNonAuthRoute from '~/hooks/useNonAuthRoute';

export default component$(() => {
  useNonAuthRoute();

  return (
    <div>
      <h1>Register</h1>
    </div>
  );
});
