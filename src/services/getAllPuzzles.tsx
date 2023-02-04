import database from "~/firebase";
import { ref, child, get } from "firebase/database";
export const getAllPuzzles = () => {
  const dbRef = ref(database);
  return get(child(dbRef, `puzzles`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let puzzlesTitles= snapshot.val().map((puzzle:any)=>{
                return puzzle.title
        })
        return puzzlesTitles;
      } else {
        return [];
      }
    })
    .catch(() => {
      return [];
    });
};