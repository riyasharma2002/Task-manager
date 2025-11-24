'use client'

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const isCompleted = task.status === 'completed'

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg ${
        isCompleted ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggle(task.id, task.status)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
            <h3
              className={`text-lg font-semibold ${
                isCompleted
                  ? 'line-through text-gray-500'
                  : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p
              className={`ml-8 text-gray-400 text-sm ${
                isCompleted ? 'line-through' : ''
              }`}
            >
              {task.description}
            </p>
          )}
          <p className="ml-8 text-xs text-gray-400 mt-2">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

