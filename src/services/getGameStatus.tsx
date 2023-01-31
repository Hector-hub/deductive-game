import database from "~/firebase";
import { ref, onValue } from "firebase/database";
export const getGameStatus = async (gameId: string) => {
 await  onValue(
    ref(database, "/games/" + gameId),
    (snapshot) => {

       let  data= snapshot.val();
  
       document.querySelectorAll('.radio-button').forEach((value:any)=>{
        value.setAttribute('class','radio-button');
        value.checked=false
       })
       setTimeout(() => {
     
         
            data['x'].forEach((value:any)=>{
                let id:any='#'+value;
                if(value!==''){
                 document.querySelector(id).setAttribute('class','dClicked')
                }
             })
           
      
         data['o'].forEach((value:any)=>{

            let id:any='#'+value;
            if(value!==''){
             document.querySelector(id).checked=true;
             document.querySelector(id).setAttribute('class','clicked');
            }
         })

 
       }, 30);
         },
    {
      onlyOnce: false,
    }
  );


  
 
  
};
