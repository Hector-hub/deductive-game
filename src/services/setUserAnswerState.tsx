import database from "~/firebase";
import { ref, set } from "firebase/database";
export const setUserAnswerState = (gameId:string,puzzleId:number,goodAnswer:any) => {

  
        set(ref(database, `games/${puzzleId}${gameId}/goodAnswer`),goodAnswer);
      
};