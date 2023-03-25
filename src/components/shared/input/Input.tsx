import type { Signal, QwikIntrinsicElements } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import './Input.scss';

type InputProps = Omit<QwikIntrinsicElements['input'], 'value'> & {
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
  }: InputProps) => (
    <div class='input-row'>
      {label && (
        <label for={name} class='input-label'>
          {label}
        </label>
      )}
      <input
        {...props}
        name={name}
        class={{
          input: true,
          className,
          'input-error': errorMessage?.length,
        }}
        bind:value={value}
      />
      {errorMessage?.map((error) => (
        <p key={`${name}_${error}`} class='error-message'>
          {error}
        </p>
      ))}
    </div>
  )
);
