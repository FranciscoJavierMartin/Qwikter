import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';
import './Button.scss';

type ButtonProps = QwikIntrinsicElements['button'] & { isLoading?: boolean };

export default component$(({ isLoading, ...props }: ButtonProps) => {
  return (
    <button class={{ loader: isLoading }} {...props}>
      {!isLoading && <Slot />}
    </button>
  );
});
