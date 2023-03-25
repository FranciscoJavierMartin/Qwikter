import { component$, useContext } from '@builder.io/qwik';
import type { UserContextState } from '~/interfaces/user';
import { UserContext } from '~/root';

export default component$(() => {
  const userContext = useContext<UserContextState>(UserContext);
  return (
    <div>
      <h1>Home page {userContext.user?.username}</h1>
    </div>
  );
});
