import database from "~/firebase";
import { ref, child, get } from "firebase/database";
export const getPuzzle = (puzzleId: number) => {
  puzzleId -= 1;
  const dbRef = ref(database);
  return get(child(dbRef, `puzzles/${puzzleId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data: any = {};
        data = snapshot.val();
        data.isLoaded = true;
        return data;
      } else {
        return { isLoaded: false };
      }
    })
    .catch(() => {
      return { isLoaded: false };
    });
};
