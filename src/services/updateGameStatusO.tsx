import database from "~/firebase";
import { ref, set , child, push, get,update  } from "firebase/database";
export const updateGameStatusO = (gameId:string, target:string,inputId:string, inputName:string='') => {

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
      data.push(inputId)
      get(child(ref(database), `games/${gameId}/x`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data:Array<any>=Object.entries(snapshot.val()).map(([key, value]) => value);  
      
        if(data.includes(inputId)){
          data.splice(
            data.indexOf(inputId),
            1
          );
        }
      
      set(ref(database, `games/${gameId}/x`),data);
    
     
      } else {

      }
    })
    .catch((err) => {
    });
        }else{
            if(!data.includes(inputId)){
              data.push(inputId)
            }
        }
       
      set(ref(database, `games/${gameId}/${target}`),data);
    
     
      } else {
      }
    })
    .catch((err) => {
    });
       

      
};