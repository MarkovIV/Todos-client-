import { ITodo } from '../interfaces/todo.interface'

export const todos: ITodo[] = [
	{
		_id: '0',
		title: 'Пройти курс по JS',
		completed: false,
		deleted: false
	},
	{
		_id: '1',
		title: 'Пройти курс по React',
		completed: false,
		deleted: false
	},
	{	
		_id: '2',
		title: 'Купить хлеб',
		completed: true,
		deleted: false
	},
	{
		_id: '3',
		title: 'Купить молоко',
		completed: false,
		deleted: false
	},
	{
		_id: '4',
		title: 'Купить яйца',
		completed: true,
		deleted: true
	}
]
