import database from "~/firebase";
import { ref, onValue } from "firebase/database";
import { getUserAnswerState } from "./getUserAnswerState";
import { useWinLose } from "~/hooks/useWinLose";
export const getGameStatus = async (
  gameId: string,
  puzzleId: number,
  totalPoints: number,
  useWin: boolean
): Promise<any> => {
  let dataStatus: any = null;
  await onValue(
    ref(database, `/games/${puzzleId}${gameId}`),
    async (snapshot) => {
     

      let data = snapshot.val();
      dataStatus = data;


      getUserAnswerState(gameId,puzzleId).then((values:any)=>{
        const allPropertiesTrue = Object.values(values).every(value => value === "true");
        const propertiesLength =Object.keys(values).length;
        if(allPropertiesTrue===true && propertiesLength===totalPoints){
          useWinLose(true, totalPoints,propertiesLength);
        }else{
          useWinLose(false, totalPoints,propertiesLength);
      
        }
      })


      if (dataStatus !== null) {
        setTimeout(() => {
          document.querySelectorAll(".radio-button").forEach((value: any) => {
            value.setAttribute("class", "radio-button");
            value.checked = false;
          });
        }, 1);

        setTimeout(() => {
          try {
            data["x"].forEach((value: any) => {
              let id: any = "#" + value;
              if (value !== "") {
                document.querySelector(id).setAttribute("class", "dClicked");
                document.querySelector(id).checked = false;
              }
            });
            data["o"].forEach((value: any) => {
              let id: any = "#" + value;
              if (value !== "") {
                document.querySelector(id).checked = true;
                document.querySelector(id).setAttribute("class", "clicked");
              }
            });
          } catch (error) {}
        }, 3);
      }
    },
    {
      onlyOnce: false,
    }
  );
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (dataStatus !== null) {
        setTimeout(() => {
          dataStatus["x"].forEach((value: any) => {
            let id: any = "#" + value;
            if (value !== "") {
              document.querySelector(id).setAttribute("class", "dClicked");
            }
          });

          dataStatus["o"].forEach((value: any) => {
            let id: any = "#" + value;
            if (value !== "") {
              document.querySelector(id).checked = true;
              document.querySelector(id).setAttribute("class", "clicked");
            }
          });
        }, 1000);
        resolve(dataStatus);
      } else {
        reject(null);
      }
    }, 500)
  );
};
