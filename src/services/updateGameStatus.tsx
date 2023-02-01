import database from "~/firebase";
import { ref, set, child, push, get, update } from "firebase/database";
export const updateGameStatus = (
  gameId: string,
  target: string,
  inputId: string,
  puzzleId:number,
  inputValue:any,
  inputName: string = ""

) => {
  get(child(ref(database), `games/${puzzleId}${gameId}/${target}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        
        let data: Array<any> = Object.entries(snapshot.val()).map(
          ([key, value]) => value
        );

        if (target === "o") {
          for (let i = 0; i < data.length; i++) {
            if (data[i]?.startsWith(inputName)) {
              data[i] = null;
            }
          }
         
          data.push(inputId);
          
          get(child(ref(database), `games/${puzzleId}${gameId}/x`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                let data: Array<any> = Object.entries(snapshot.val()).map(
                  ([key, value]) => value
                );

                if (data.includes(inputId)) {
                  data.splice(data.indexOf(inputId), 1);
                }

                set(ref(database, `games/${puzzleId}${gameId}/x`), data);
              } else {
              }
            })
            .catch((err) => {});
        } else {
          if (!data.includes(inputId)) {
            data.push(inputId);
          }
        }
        if(data[0]===""){
          delete data[0]
        }
        set(ref(database, `games/${puzzleId}${gameId}/${target}`), data);
      } else {
      }
    })
    .catch((err) => {});
};
