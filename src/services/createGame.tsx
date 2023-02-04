import database from "~/firebase";
import { ref, set } from "firebase/database";
export const createGame = (gameId:string,puzzleId:number) => {
  
        set(ref(database, `games/${puzzleId}${gameId}`), {
        o:[''],
        x:[''],
        goodAnswer:{name:'1'}
        });
      
};