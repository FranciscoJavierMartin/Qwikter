import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';
import './Button.scss';

type ButtonVariant = 'primary';

type ButtonProps = QwikIntrinsicElements['button'] & {
  isLoading?: boolean;
  variant?: ButtonVariant;
};

export default component$(
  ({ isLoading, variant = 'primary', ...props }: ButtonProps) => (
    <button {...props} class={{ [variant]: true, loader: isLoading }}>
      {!isLoading && <Slot />}
    </button>
  )
);
