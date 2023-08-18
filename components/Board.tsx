"use client";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";

import Column from "./Column";

type Props = {};

const Board = (props: Props) => {
  const [board, getBoard, setBoardState, updateTodoInDb] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDb,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // Check if the user dragged the card outside the board
    if (!destination) return;

    //handle column drag

    if (type === "column") {
      const entries = Array.from(board.columns.entries());

      // here we gonna get the draged column
      const [removed] = entries.splice(source.index, 1);

      //now we gonna push it into the destination
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    // handle todo drag

    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    if (!startColIndex || !finishColIndex) return;

    const startCol = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;

    //  if we drag in the same position we do nothing
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      // if we drag the todo and put it in the same column
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      // we drag the todo and put it in a defferent column
      // 1) take the state of the source column todos and the destination column todos

      const finishTodos = finishCol.todos;
      finishTodos.splice(destination.index, 0, todoMoved);
      const newStartCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newFinishCol = {
        id: finishCol.id,
        todos: finishTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newStartCol);
      newColumns.set(finishCol.id, newFinishCol);

      // update in the db
      updateTodoInDb(todoMoved, finishCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => {
          return (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Array.from(board.columns.entries()).map(
                ([id, column], index) => {
                  return (
                    <Column
                      key={id}
                      id={id}
                      todos={column.todos}
                      index={index}
                    />
                  );
                }
              )}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
