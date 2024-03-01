import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd"; 
import TaskCol from "../TaskCol";

const taskData = {
  taskCols: [
    {
      id: '0',
      title: 'To Do',
      taskIds: [0,1,2,3,5]
    },
    {
      id: '1',
      title: 'Doing',
      taskIds: [4]
    },
    {
      id: '2',
      title: 'Test',
      taskIds: [6,8,10]
    },
    {
      id: '3',
      title: 'Done',
      taskIds: [7,9]
    }
  ],
  tasks: [
    {
    "id": 0,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    },
    {
    "id": 1,
    "title": "delectus aut autem",
    },
    {
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    },
    {
    "id": 3,
    "title": "fugiat veniam minus",
    },
    {
    "id": 4,
    "title": "et porro tempora",
    },
    {
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    },
    {
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    },
    {
    "id": 7,
    "title": "illo expedita consequatur quia in",
    },
    {
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    },
    {
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    },
    {
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    }
  ]
}

const Board = () => {
  const [taskCols, setTaskCols] = useState(taskData.taskCols);
  const tasks = taskData.tasks;

  //پاکش کن آخر
  // const [test, setTest] = useState()

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    if(!destination || (source.droppableId === destination.droppableId && source.index === destination.index)){
      return;
    }
  
    const newTaskCols = taskCols.map((Col) => {
      let newTaskIds = [...Col.taskIds];
      if(Col.id === source.droppableId){
        newTaskIds.splice(source.index, 1);
      }
      if(Col.id === destination.droppableId){
        newTaskIds.splice(destination.index, 0, Number(draggableId));
      }
      
      return {...Col, taskIds: newTaskIds};
    })
    
    setTaskCols(newTaskCols);
  }

  const taskPointer = (taskIds) => {
    return tasks.filter((task) => taskIds.includes(task.id))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex justify-center items-center gap-5">
        {taskCols.map((col) => (
          <TaskCol
            key={col.id}
            title={col.title}
            tasks={taskPointer(col.taskIds)}
            id={String(col.id)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;