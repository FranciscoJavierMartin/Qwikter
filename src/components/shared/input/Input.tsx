import type { Signal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import './Input.scss';

interface InputProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password';
  value: Signal<string>;
  className?: string;
  label?: string;
  placeholder: string;
  errorMessage?: string[];
}

export default component$(
  ({ label, name, className, errorMessage, value, ...props }: InputProps) => {
    return (
      <div class='input-row'>
        {label && (
          <label for={name} class='input-label'>
            {label}
          </label>
        )}
        <input
          name={name}
          class={`input ${className} ${errorMessage ? 'input-error' : ''}`}
          bind:value={value}
          {...props}
        />
        {errorMessage?.map((error) => (
          <p key={`${name}_${error}`} class='error-message'>
            {error}
          </p>
        ))}
      </div>
    );
  }
);
