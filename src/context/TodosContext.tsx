import { createContext, useState } from 'react'
import { ITodo } from '../interfaces/todo.interface'


interface ITodosContext {
  todosList: ITodo[]  
  todosListEdit: (newTodosList: ITodo[]) => void
  todosListFilter: string
  todosListFilterSet: (filter: string) => void
  todosListUpdateValue: boolean
  todosListUpdate: () => void
}

export const TodosContext = createContext<ITodosContext>({
  todosList: [],
  todosListEdit: (newTodosList: ITodo[]) => {},
  todosListFilter: 'all',
  todosListFilterSet: (filter: string) => {},
  todosListUpdateValue: false,
  todosListUpdate: () => {}
})

export const TodosState = ({ children }: {children: React.ReactNode}) => {
	const [todosList, setTodosList] = useState<ITodo[]>([])
	const [todosListFilter, setTodosListFilter] = useState<string>('all')
	const [todosListUpdateValue, setTodosListUpdateValue] = useState<boolean>(false)

	const todosListEdit = (newTodosList: ITodo[]) => {
		setTodosList(newTodosList)
	}

	const todosListFilterSet = (filter: string) => {
		setTodosListFilter(filter)
	}

	const todosListUpdate = () => {
		setTodosListUpdateValue(!todosListUpdateValue)
	}

	return (
		<TodosContext.Provider value={{ todosList, todosListFilter, todosListUpdateValue, todosListEdit, todosListFilterSet, todosListUpdate }}>
		{ children }
		</TodosContext.Provider>
	)
}