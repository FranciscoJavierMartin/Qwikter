import { useContext, useVisibleTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import type { UserContextState } from '~/interfaces/user';
import { UserContext } from '~/root';

export default () => {
  const userContext = useContext<UserContextState>(UserContext);
  const navigate = useNavigate();

  useVisibleTask$(() => {
    if (userContext.token) {
      navigate('/social/streams');
    }
  });
};
