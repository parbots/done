export type Task = {
    id: number;
    text: string;
    complete: boolean;
};

export type Filter = 'all' | 'incomplete' | 'complete';
