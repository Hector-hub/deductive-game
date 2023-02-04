

import Swal from "sweetalert2";
export const useWinLose=(userWin:boolean,totalPoints:number, userAnswerCount:number)=>{

    if (userWin
      ) {
        Swal.fire({
          icon: `success`,
          title: "Ganaste!",
          showCancelButton: true,
          cancelButtonText: "No",
          cancelButtonColor: "#ff0000",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          text: "¿Quieres jugar otra vez? Ingresa el numero de puzzle.",
        }).then((result: any) => {
          if (result.isConfirmed) {
            location.href = "/?puzzle=" + result.value;
          }
        });
      } else if (
        userAnswerCount ===totalPoints
      ) {
        Swal.fire({
          icon: `error`,
          title: "Has perdido!",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Si",
          cancelButtonColor: "#ff0000",
          text: "¿Quieres ver las respuestas?",
        }).then((result: any) => {
          if (result.isConfirmed) {
            setTimeout(() => {
              location.href = "#answers";
            }, 1000);
          } else {
            location.href = "/";
          }
        });
      }

      return userAnswerCount;
}