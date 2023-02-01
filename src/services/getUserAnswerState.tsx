import database from "~/firebase";
import { ref, child, get } from "firebase/database";
export const getUserAnswerState = (gameId:string,puzzleId:number) => {
  const dbRef = ref(database);
  return get(child(dbRef, `games/${puzzleId}${gameId}/goodAnswer`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return 0;
      }
    })
    .catch(() => {
      return 0;
    });
};
