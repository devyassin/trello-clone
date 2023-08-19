import { Board, Todo, TypedColumn } from "@/types/types";

const formatTodosForAi = (board: Board) => {
  const todos = Array.from(board.columns.entries());
  const flatarray = todos.reduce((map: any, [key, value]: any) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypedColumn]: Todo[] });

  const flatArrrayCounted = Object.entries(flatarray).reduce(
    (map: any, [key, value]: any) => {
      map[key as TypedColumn] = value.length;
      return map;
    },
    {} as { [key in TypedColumn]: number }
  );

  return flatArrrayCounted;
};

export default formatTodosForAi;
