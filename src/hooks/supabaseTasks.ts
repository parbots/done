
import { useState } from 'react'

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import type { Task } from '@/types/task'

import { useTaskList } from './tasks'

export const useSupabaseTasks = () => {

    const supabase = useSupabaseClient();
    const user = useUser();

    const taskList = useTaskList([]);

    const [loading, setLoading] = useState<boolean>(true);

    // Get initial tasks from supabase or do nothing if no session is found
    const getInitialTasks = async () => {

        // Get session data from supabase
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        // Return AuthError
        if (sessionError) {
            setLoading(false);

            return { error: sessionError };
        }

        // Exit if no session is found (no user signed in)
        if (!sessionData || !sessionData.session) {
            setLoading(false);

            return { error: null };
        }

        const session = sessionData.session;

        // Get user task data from supabase
        const { data: taskData, error: databaseError } = await supabase
            .from('tasks')
            .select('id, task_text, complete')
            .eq('user_id', session.user.id);

        if (databaseError) {
            setLoading(false);

            return { error: databaseError };
        }

        // Sort task data by id
        taskData.sort((a, b) => {
            return a.id - b.id;
        });

        // Map task data to taskList state
        taskList.setTasks(
            taskData.map((task) => {
                return {
                    id: task.id,
                    text: task.task_text,
                    complete: task.complete,
                };
            })
        );

        setLoading(false);

        return { error: null };
    };

    // Get supabase tasks and update taskList state
    const updateTasks = async () => {

        // Get user task data from supabase
        const { data, error } = await supabase
            .from('tasks')
            .select('id, task_text, complete')
            .eq('user_id', user?.id);

        if (error) return { error: error };

        // Sort task data by id
        data.sort((a, b) => {
            return a.id - b.id;
        });

        // Map task data to taskList state
        taskList.setTasks(
            data.map((task) => {
                return {
                    id: task.id,
                    text: task.task_text,
                    complete: task.complete,
                };
            })
        );
    };

    // Create new task in supabase and add to taskList state
    const addTask = async (newTaskText: string, newTaskComplete: boolean = false) => {

        // Insert new task in supabase and return the new row
        const { data, error } = await supabase
            .from('tasks')
            .insert({
                user_id: user?.id,
                task_text: newTaskText,
                complete: newTaskComplete,
            })
            .select()
            .single();

        if (error) return { error: error };

        // Add task to taskList state
        // supabase generates the id
        taskList.addTask({
            id: data.id,
            text: data.task_text,
            complete: data.complete,
        });
    };

    // Remove task from supabase and taskList state
    const removeTask = async (selectedTask: Task) => {

        // Delete task in supabase
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) return { error: error };

        // Remove task from taskList state
        taskList.removeTask(selectedTask);
    };

    // Set 'complete = !complete' in supabase and taskList state
    const toggleTaskComplete = async (selectedTask: Task) => {

        // Update 'is_complete' property in supabase
        const { error } = await supabase
            .from('tasks')
            .update({
                complete: !selectedTask.complete,
            })
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) return { error: error };

        // Toggle complete in taskList state
        taskList.toggleTaskComplete(selectedTask);
    };

    // Update task text value in supabase and taskList state
    const editTaskText = async (selectedTask: Task, newTaskText: string) => {

        // Update 'task_text' property in supabase
        const { error } = await supabase
            .from('tasks')
            .update({
                task_text: newTaskText,
            })
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) return { error: error };

        // Update 'text' property in taskList state
        taskList.editTaskText(selectedTask, newTaskText);
    };

    // Remove all tasks where 'complete === true' in supabase and taskList state
    const clearCompleteTasks = async () => {

        // Delete all user tasks where 'complete === true' in supabase
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('user_id', user?.id)
            .eq('complete', true);

        if (error) return { error: error };

        // Remove complete tasks from taskList state
        taskList.clearCompleteTasks();
    };

    // Remove all user tasks in supabase and taskList state
    const clearAllTasks = async () => {

        // Delete all user tasks in supabase
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('user_id', user?.id);

        if (error) return { error: error };

        // Remove all tasks from taskList state
        taskList.clearAllTasks
    };

    return {
        loadingTasks: loading,

        tasks: taskList.tasks,

        searchValue: taskList.searchValue,
        setSearchValue: taskList.setSearchValue,

        currentFilter: taskList.currentFilter,
        setCurrentFilter: taskList.setCurrentFilter,

        getInitialTasks,
        updateTasks,
        addTask,
        removeTask,
        toggleTaskComplete,
        editTaskText,
        clearCompleteTasks,
        clearAllTasks
    };
};

