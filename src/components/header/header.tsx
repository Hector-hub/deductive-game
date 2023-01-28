import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <h1>QeQ</h1>
        <p style={'padding:-20px; margin-top:-15px; font-size:13.4px'}>¿Quien es Quien?</p>
      </div>
    </header>
  );
});
