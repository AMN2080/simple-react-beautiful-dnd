import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd"; 
import TaskCol from "../TaskCol";
import { taskData } from "../../Data";

const Board = () => {
  const [taskCols, setTaskCols] = useState(taskData.taskCols);
  const tasks = taskData.tasks;

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    if(!destination || (source.droppableId === destination.droppableId && source.index === destination.index)){
      return;
    }
  
    const newTaskCols = taskCols.map((Col) => {
      let newTaskIds = [...Col.taskIds];
      if(Col.id === Number(source.droppableId)){
        newTaskIds.splice(source.index, 1);
      }
      if(Col.id === Number(destination.droppableId)){
        newTaskIds.splice(destination.index, 0, Number(draggableId));
      }
      
      return {...Col, taskIds: newTaskIds};
    })
    
    setTaskCols(newTaskCols);
  }

  const taskPointer = (taskIds) => {
    return taskIds.map(id => tasks.find(task => task.id === id));
  }  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex justify-center items-center gap-5 bg-slate-800">
        {taskCols.map((col) => (
          <TaskCol
            key={col.id}
            title={col.title}
            tasks={taskPointer(col.taskIds)}
            id={String(col.id)}
          />
        ))
        }
      </div>
    </DragDropContext>
  );
};

export default Board;