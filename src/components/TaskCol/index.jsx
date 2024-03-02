import PropTypes from 'prop-types';
import { Droppable } from "react-beautiful-dnd";
import TaskBox from "../TaskBox";

const TaskCol = ({title, tasks, id}) => {
  return (
    <div className="w-80 h-96 bg-slate-300 border border-gray-500 overflow-y-auto">
      <p className="p-2 bg-blue-300 sticky top-0 text-center">{title}</p>
      <Droppable droppableId={String(id)}>
        {(provided, snapshot) => (
          <div
            className={`p-1 flex-grow transition-colors space-y-1 duration-200 ease-in-out ${snapshot.isDraggingOver ? 'bg-green-200' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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

TaskCol.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default TaskCol;