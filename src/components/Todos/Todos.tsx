import { useContext, useEffect, useState } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { TodosProps } from './Todos.props'
import { Statline } from '../Statline/Statline'
import { ITodo } from '../../interfaces/todo.interface'
import { Todo } from '../Todo/Todo'
import styles from './Todos.module.css'
import cn from 'classnames'
import { API } from '../../api/api'
import axios from 'axios'


export const Todos = ({ className, ...props }: TodosProps): JSX.Element => {
	const { todosList, todosListFilter, todosListUpdateValue, todosListEdit } = useContext(TodosContext)
	const [todosListView, setTodosListView] = useState<JSX.Element>(<></>)
	const [loading, setLoading] = useState<boolean>(true)
	const [errorMessage, setErrorMessage] = useState<string>('')

	useEffect( () => {		
		axios.get(API.getTodos)
			.then( res => {
				setLoading(false)			
				todosListEdit(res.data)				
			})
			.catch( e => {
				setLoading(false)
				console.log('Error:', e)
				setErrorMessage(e.message)			
			})
		}, [todosListEdit])

	useEffect(() => {
		constructTodosListView(todosList)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todosListUpdateValue, todosListFilter, todosList])

	const constructTodosListView = (currentTodosList: ITodo[]) => {
		const updatedTodosListView = (): JSX.Element => {

			return (
				<>
					{filteredTodoList(currentTodosList).map(todo => <Todo className={styles.todo} todo={todo} key={todo._id} data-testid="todo" />)}
				</>
			)
		}

		setTodosListView(updatedTodosListView())
	}

	const filteredTodoList = (totalTodosList: ITodo[]): ITodo[] => {
		let filteredTodosList: ITodo[] = [];

		switch (todosListFilter) {
			case 'all':
				filteredTodosList = totalTodosList.filter(todo => !todo.deleted)
				break;
			case 'active':
				filteredTodosList = totalTodosList.filter(todo => !todo.completed && !todo.deleted)
				break;
			case 'completed':
				filteredTodosList = totalTodosList.filter(todo => todo.completed && !todo.deleted)
				break;
			default:
				filteredTodosList = totalTodosList.filter(todo => !todo.deleted)
				break;
		}

		return filteredTodosList
	}

	return (
		<>
			<div {...props} id="todos" className={cn(className, styles.todos)} data-testid="todos list">
				<div className={styles.todosList}>{loading? <span>Loading ...</span>:
													errorMessage? <span className={styles.error}>{errorMessage}</span>:todosListView}</div>
				<Statline className={styles.statline} />
			</div>
		</>
	)
}