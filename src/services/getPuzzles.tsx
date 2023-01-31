import { getDatabase, ref, child, get } from "firebase/database";
export const getPuzzle = (puzzleId:number) => {
  const dbRef = ref(getDatabase());
  puzzleId-=1;
  return get(child(dbRef, `puzzles/${puzzleId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {

    }
  }).catch((error) => {
    console.error(error);
  });

  
}
