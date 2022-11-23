import { useContext, useEffect, useState } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { StatlineProps } from './Statline.props'
import { ITodo } from '../../interfaces/todo.interface'
import styles from './Statline.module.css'
import cn from 'classnames'

export const Statline = ({ className, ...props }: StatlineProps): JSX.Element => {
	const {todosList, todosListUpdateValue} = useContext(TodosContext)
	const [statlineView, setStatlineView] = useState<JSX.Element>(<></>)

	useEffect(() => {
		constructStatlineView(todosList)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todosListUpdateValue, todosList])

	const constructStatlineView = (currentTodosList: ITodo[]) => {
		const updatedStatlineView = (): JSX.Element => {
			return (
				<>				
					<div className={styles.total} data-testid="statline total">Total: {currentTodosList.filter(todo => todo.deleted !== true).length}</div>
					<div className={styles.active} data-testid="statline active">Active: {currentTodosList.filter(todo => (todo.completed !== true) && (todo.deleted !== true)).length}</div>
					<div className={styles.completed} data-testid="statline completed">Completed: {currentTodosList.filter(todo => (todo.completed === true) && (todo.deleted !== true)).length}</div>					
				</>
			)			
		}

		setStatlineView(updatedStatlineView())
	}

	return (
		<>
			<div id='statline' {...props} className={cn(className, styles.statline)} data-testid="statline">
				{statlineView}	
			</div>				
		</>
	)
}