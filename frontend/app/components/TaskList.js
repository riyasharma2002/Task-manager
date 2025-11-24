'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import TaskItem from './TaskItem'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch tasks')
  }
  return res.json()
}

export default function TaskList({ onEdit, onMutate }) {
  const { data: tasks, error, isLoading, mutate } = useSWR(
    `${API_URL}/api/tasks`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  // Expose mutate function to parent
  useEffect(() => {
    if (onMutate) {
      onMutate(mutate)
    }
  }, [mutate, onMutate])

  const handleToggle = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        mutate()
      } else {
        alert('Failed to update task status')
      }
    } catch (error) {
      console.error('Error toggling task:', error)
      alert('An error occurred while updating the task')
    }
  }

  const handleDelete = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        mutate()
      } else {
        alert('Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('An error occurred while deleting the task')
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading tasks...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <p className="text-red-600 mb-4">Failed to load tasks</p>
        <p className="text-gray-600 text-sm">
          Make sure the backend server is running on {API_URL}
        </p>
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <p className="text-gray-600 text-lg">No tasks yet. Create your first task!</p>
      </div>
    )
  }

  const pendingTasks = tasks.filter((task) => task.status === 'pending')
  const completedTasks = tasks.filter((task) => task.status === 'completed')

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Pending Tasks ({pendingTasks.length})
          </h2>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

