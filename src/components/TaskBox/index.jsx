import { Draggable } from "react-beautiful-dnd";

const TaskBox = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task.id)} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div className={`min-h-20 mx-3 p-2 bg-orange-400 hover:bg-orange-300 text-white flex justify-between flex-col space-y-2 rounded-xl cursor-pointer ${snapshot.isDraggingOver ? 'bg-green-200' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-start p-1">
            <span className="text-xs">
              #{task.id}
            </span>
          </div>
          <div className="flex justify-center p-1">
            <p>{task.title}</p>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskBox;
