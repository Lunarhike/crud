import { useState } from "react";

// Example with inline editing
const TodoItem = ({
  todo,
  updateMutation,
}: {
  todo: any;
  updateMutation: any;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(todo.task);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleUpdate = () => {
    updateMutation.mutate({
      id: todo.id,
      task: newTask,
      completed: isCompleted,
    });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <div>{todo.task}</div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {/* ... your delete button */}
        </>
      )}
    </div>
  );
};
