export type Item = {
    id: string;
    text: string;
    complete: boolean;
};

export type Filter = 'all' | 'incomplete' | 'complete';
