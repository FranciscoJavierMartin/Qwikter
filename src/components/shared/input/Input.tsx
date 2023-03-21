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
}

export default component$(
  ({ label, name, className, ...props }: InputProps) => {
    return (
      <div class='input-row'>
        {label && (
          <label for={name} class='input-label'>
            {label}
          </label>
        )}
        <input name={name} class={`input ${className}`} {...props} />
      </div>
    );
  }
);
