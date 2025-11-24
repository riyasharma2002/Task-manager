'use client'

import { useState, useRef } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const mutateRef = useRef(null)

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  const handleMutate = (mutateFn) => {
    mutateRef.current = mutateFn
  }

  const handleFormSuccess = () => {
    // Refresh the task list after successful create/update
    if (mutateRef.current) {
      mutateRef.current()
    }
    handleFormClose()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              {showForm ? 'Cancel' : '+ New Task'}
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <TaskForm
                task={editingTask}
                onSuccess={handleFormSuccess}
                onCancel={handleFormClose}
              />
            </div>
          )}
        </div>

        <TaskList onEdit={handleEdit} onMutate={handleMutate} />
      </div>
    </main>
  )
}

