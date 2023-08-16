"use client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";

type Props = {};

const Board = (props: Props) => {
  const getBoard = useBoardStore((state) => state.getBoard);
  useEffect(() => {
    getBoard();
  }, [getBoard]);
  return (
    <h1>hello</h1>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => {
    //       return <div>{/* Rerender all columns */}</div>;
    //     }}
    //   </Droppable>
    // </DragDropContext>
  );
};

export default Board;
