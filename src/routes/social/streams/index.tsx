import { component$, useContext } from '@builder.io/qwik';
import type { UserContextState } from '~/interfaces/user';
import { UserContext } from '~/root';

export default component$(() => {
  const user = useContext<UserContextState>(UserContext);
  return (
    <div>
      <h1>Home page {user.name}</h1>
    </div>
  );
});
