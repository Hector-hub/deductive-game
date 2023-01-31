import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./Logo.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
   <a href="/">
    <div class="logo">
      <h1>QeQ</h1>
      <p style={"padding:-20px; margin-top:-15px; font-size:13.4px"}>
        ¿Quién es Quién?
      </p>
    </div>
   </a> 
  );
});
