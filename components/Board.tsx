"use client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

type Props = {};

const Board = (props: Props) => {
  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => {
          <div>{/* Rerender all columns */}</div>;
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
