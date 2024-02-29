import { Droppable } from "react-beautiful-dnd";
import TaskBox from "../TaskBox";

// eslint-disable-next-line react/prop-types
const TaskCol = ({title, tasks, id}) => {
  return (
    <div className="w-80 h-96 bg-slate-300 border border-gray-500 overflow-y-auto">
      <p className="p-2 bg-blue-300 sticky text-center">{title}</p>
      <Droppable droppableId={String(id)}>
        {(provided, snapshot) => (
          <div
            className={`p-1 flex-grow transition-colors space-y-1 duration-200 ease-in-out ${snapshot.isDraggingOver ? 'bg-green-200' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {tasks.map((item, index) => (
              <TaskBox key={item.id} index={index} task={item} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskCol;