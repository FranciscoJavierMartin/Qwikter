import type { Signal, QwikIntrinsicElements } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import Eye from '~/components/icons/Eye';
import './PasswordInput.scss';
import EyeSlash from '~/components/icons/EyeSlash';

type InputProps = Omit<QwikIntrinsicElements['input'], 'value' | 'type'> & {
  value: Signal<string>;
  className?: string;
  label?: string;
  errorMessage?: string[];
};

export default component$(
  ({
    label,
    name,
    className = '',
    errorMessage,
    value,
    ...props
  }: InputProps) => {
    const isPasswordVisible = useSignal<boolean>(false);

    return (
      <div class='input-row'>
        {label && (
          <label for={name} class='input-label'>
            {label}
          </label>
        )}
        <div class='input-field'>
          <input
            {...props}
            name={name}
            type={isPasswordVisible.value ? 'text' : 'password'}
            class={{
              input: true,
              className,
              'input-error': errorMessage?.length,
            }}
            bind:value={value}
          />
          {isPasswordVisible.value ? (
            <EyeSlash
              onClick$={() =>
                (isPasswordVisible.value = !isPasswordVisible.value)
              }
            />
          ) : (
            <Eye
              onClick$={() =>
                (isPasswordVisible.value = !isPasswordVisible.value)
              }
            />
          )}
        </div>
        {errorMessage?.map((error) => (
          <p key={`${name}_${error}`} class='error-message'>
            {error}
          </p>
        ))}
      </div>
    );
  }
);
