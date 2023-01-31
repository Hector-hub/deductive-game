import database from "~/firebase";
import { ref, set , child, push, get,update  } from "firebase/database";
import { updateGameStatusO } from "./updateGameStatusO";
export const updateGameStatusX = (gameId:string, target:string,inputId:string, inputName:string='') => {

get(child(ref(database), `games/${gameId}/${target}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data:Array<any>=Object.entries(snapshot.val()).map(([key, value]) => value);
     
  
          
                if(!data.includes(inputId)){
                  data.push(inputId)
                }else{
                  data.splice(
                    data.indexOf(inputId),
                    1
                  );
                }
      set(ref(database, `games/${gameId}/${target}`),data);
    
     
      } else {
      }
    })
    .catch((err) => {
    });
    get(child(ref(database), `games/${gameId}/${target}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data:Array<any>=Object.entries(snapshot.val()).map(([key, value]) => value);
     
        if(target==="o"){
            for (let i = 0; i < data.length; i++) {
                if(data[i]?.startsWith(inputName)){
                 data[i]=null; 
                }
      }
        }else{

        }
       
      set(ref(database, `games/${gameId}/${target}`),[...data,inputId]);
    
     
      } else {
      }
    })
    .catch((err) => {
    });
};