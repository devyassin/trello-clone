import { Board } from "@/types/types";
import formatTodosForAi from "./formatTodosForAi";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAi(board);
  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

//   const GPTdata = await res.json();
//   const { content } = GPTdata;
  return res;
};

export default fetchSuggestion;
