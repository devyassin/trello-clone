"use client";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import Column from "./Column";

type Props = {};

const Board = (props: Props) => {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);
  console.log(Array.from(board.columns.entries()));
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    console.log(source);
    console.log(destination);
    console.log(type);
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
