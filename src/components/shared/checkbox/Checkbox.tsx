import type { QwikIntrinsicElements, Signal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import './Checkbox.scss';

type CheckboxProps = Omit<QwikIntrinsicElements['input'], 'type'> & {
  label: string;
  input: Signal<boolean>;
};

export default component$(({ label, name, input, ...props }: CheckboxProps) => (
  <label for={name}>
    <input {...props} name={name} type='checkbox' bind:checked={input} />
    {label}
  </label>
));
