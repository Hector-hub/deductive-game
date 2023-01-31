import database from "~/firebase";
import { ref, set } from "firebase/database";
export const createGame = (gameId:string) => {
  
        set(ref(database, 'games/' + gameId), {
        o:[''],
        x:['']
        });
      
};