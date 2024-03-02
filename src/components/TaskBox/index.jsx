import PropTypes from 'prop-types';
import { Draggable } from "react-beautiful-dnd";

const TaskBox = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task.id)} key={task.id} index={index}>
      {(provided) => (
        <div className='min-h-20 mx-3 p-2 bg-orange-400 hover:bg-orange-300 text-white flex justify-between flex-col space-y-2 rounded-xl cursor-pointer'
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

TaskBox.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired 
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskBox;
