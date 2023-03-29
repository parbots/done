
import { useState } from 'react'

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import * as Sentry from '@sentry/nextjs'

import { useTaskList } from '@/hooks/tasks'
import type { Task } from '@/types/task'

export const useSupabaseTasks = (table: string) => {

    const supabase = useSupabaseClient();
    const user = useUser();

    const taskList = useTaskList([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Get initial tasks from supabase or do nothing if no session is found
    const getInitialTasks = async () => {

        // Get session data from supabase
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        // Return AuthError
        if (sessionError) {
            setLoading(false);

            Sentry.captureException(sessionError);

            setError(sessionError.message);

            return
        }

        // Exit if no session is found (no user signed in)
        if (!sessionData || !sessionData.session) {
            setLoading(false);

            return
        }

        const session = sessionData.session;

        // Get user task data from supabase
        const { data: taskData, error: databaseError } = await supabase
            .from(table)
            .select('id, task_text, complete')
            .eq('user_id', session.user.id);

        if (databaseError) {
            setLoading(false);

            Sentry.captureException(databaseError);

            setError(databaseError.message);

            return
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
    };

    // Get supabase tasks and update taskList state
    const updateTasks = async () => {

        // Get user task data from supabase
        const { data, error } = await supabase
            .from(table)
            .select('id, task_text, complete')
            .eq('user_id', user?.id);

        if (error) {
            Sentry.captureException(error);
    
            setError(error.message);

            return
        }

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
            .from(table)
            .insert({
                user_id: user?.id,
                task_text: newTaskText,
                complete: newTaskComplete,
            })
            .select()
            .single();

        if (error) {
            Sentry.captureException(error);
    
            setError(error.message);

            return
        }

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
            .from(table)
            .delete()
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) {
            Sentry.captureException(error);
    
            setError(error.message);

            return
        }

        // Remove task from taskList state
        taskList.removeTask(selectedTask);
    };

    // Set 'complete = !complete' in supabase and taskList state
    const toggleTaskComplete = async (selectedTask: Task) => {

        // Update 'is_complete' property in supabase
        const { error } = await supabase
            .from(table)
            .update({
                complete: !selectedTask.complete,
            })
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) {
            Sentry.captureException(error);
    
            setError(error.message);

            return
        }

        // Toggle complete in taskList state
        taskList.toggleTaskComplete(selectedTask);
    };

    // Update task text value in supabase and taskList state
    const editTaskText = async (selectedTask: Task, newTaskText: string) => {

        // Update 'task_text' property in supabase
        const { error } = await supabase
            .from(table)
            .update({
                task_text: newTaskText,
            })
            .eq('user_id', user?.id)
            .eq('id', selectedTask.id);

        if (error) {
            Sentry.captureException(error);
    
            setError(error.message);

            return
        }

        // Update 'text' property in taskList state
        taskList.editTaskText(selectedTask, newTaskText);
    };

    // Remove all tasks where 'complete === true' in supabase and taskList state
    const clearCompleteTasks = async () => {

        // Delete all user tasks where 'complete === true' in supabase
        const { error } = await supabase
            .from(table)
            .delete()
            .eq('user_id', user?.id)
            .eq('complete', true);

        if (error) {
            Sentry.captureException(error);
    
            setError(error.message);

            return
        }

        // Remove complete tasks from taskList state
        taskList.clearCompleteTasks();
    };

    // Remove all user tasks in supabase and taskList state
    const clearAllTasks = async () => {

        // Delete all user tasks in supabase
        const { error } = await supabase
            .from(table)
            .delete()
            .eq('user_id', user?.id);

        if (error) {
            Sentry.captureException(error);
    
            setError(error.message);

            return
        }

        // Remove all tasks from taskList state
        taskList.clearAllTasks
    };

    return {
        loading,
        error,

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

