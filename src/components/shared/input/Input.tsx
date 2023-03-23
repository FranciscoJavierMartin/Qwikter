import { component$ } from '@builder.io/qwik';
import './Input.scss';

interface InputProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password';
  value: string;
  className?: string;
  label?: string;
  placeholder: string;
  onInput$: any;
  errorMessage?: string[];
}

export default component$(
  ({ label, name, className, errorMessage, ...props }: InputProps) => {
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
