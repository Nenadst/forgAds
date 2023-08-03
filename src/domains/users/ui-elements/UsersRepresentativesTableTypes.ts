export interface Column {
    id: 'name' | 'position' | 'email' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}
