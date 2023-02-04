import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Swal from "sweetalert2";
import styles from "./ChangePuzzleButton.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <button
      class={"change"}
      onClick$={() => {
        Swal.fire({
          icon: `success`,
          iconColor: "#fff",
          iconHtml: '<h3 style="color:slateblue">QeQ</h3>',
          title: "Bienvenido!",
          showCancelButton: true,
          cancelButtonText: "No",
          cancelButtonColor: "#ff0000",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          text: "Ingresa el número de puzzle.",
        }).then((result: any) => {
          if (result.isConfirmed) {
            location.href = "/?puzzle=" + result.value;
          }
        });
      }}
    >
      Cambiar de puzzle
    </button>
  );
});
