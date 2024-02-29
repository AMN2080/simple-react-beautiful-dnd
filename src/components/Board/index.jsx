import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd"; 
import TaskCol from "../TaskCol";

const Board = () => {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      })
  }, []);

  const findItemById = (id, items) => {
    return items.find(item => item.id === id);
  }
  
  const removeItemById = (id, items) => {
    return items.filter(item => item.id !== id);
  }  

  const handleDradEnd = (result) => {
    const { destination, source, draggableId } = result;

    if(source.draggableId === destination.draggableId){
      return;
    }

    // remove
    if(source.draggableId === 2){
      setCompleted(removeItemById(draggableId, completed))
    } else {
      setIncomplete(removeItemById(draggableId, incomplete))
    }

    // get
    const task = findItemById(draggableId, [...incomplete, ...completed]);

    // add
    if(destination.droppableId === 2){
      // completed: true اینطوری هم میشه انگار
      setCompleted([{...task, completed: !task.completed}, ...completed])
    } else {
      setIncomplete([{...task, completed: !task.completed}, ...incomplete])
    }
  }

  return (
    <DragDropContext onDragEnd={handleDradEnd}>
      <div className="h-screen flex justify-center items-center gap-5">
        <TaskCol
          title="To Do"
          tasks={incomplete}
          id="1"
        />
        <TaskCol
          title="Doing"
          tasks={completed}
          id="2"
        />
        <TaskCol
          title="Done"
          tasks={[]}
          id="3"
        />
      </div>
    </DragDropContext>
  );
};

export default Board;