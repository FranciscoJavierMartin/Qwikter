import {
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import type { UserContextState } from '~/interfaces/user';
import '~/styles/variables.css';
import '~/styles/global.scss';

export const UserContext = createContextId<UserContextState>('user.context');

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  const userStore = useStore<UserContextState>({} as UserContextState);
  useContextProvider(UserContext, userStore);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Qwikter - The best social media app of the century'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <title>Qwikter - The best social media app of the century</title>
      </head>
      <body lang='en'>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
