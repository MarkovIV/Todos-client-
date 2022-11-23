import { CheckboxProps } from './Checkbox.props'
import { useState, useEffect, useContext, KeyboardEvent } from 'react'
import { TodosContext } from '../../context/TodosContext'
import styles from './Checkbox.module.css'
import cn from 'classnames'
import { ReactComponent as CheckboxIsDone } from './checkboxIsDone.svg'
import { ReactComponent as CheckboxIsNotDone } from './checkboxIsNotDone.svg'
import { ITodo } from '../../interfaces/todo.interface'
import axios from 'axios'
import { API } from '../../api/api'

export const Checkbox = ({ todo, className, ...props }: CheckboxProps): JSX.Element => {
	const [checkBox, setCheckBox] = useState<JSX.Element>(<></>)
	const {todosListUpdate} = useContext(TodosContext)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		constructCheckBox(todo.completed)

		todosListUpdate()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todo.completed])
	
	const constructCheckBox = (currentCompleted: boolean) => {
		const updatedCheckBox = (): JSX.Element => {
			
			if (currentCompleted) {
				return (				
					<div
						className={cn(className, styles.checkbox)}
						onClick={() => onClick(todo)}
						tabIndex={0}
						onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleSpace(todo, e)}
						>
						<CheckboxIsDone data-testid="checkbox is done"/>						
					</div>				
				)
			}
			else {
				return (
					<div
						className={cn(className, styles.checkbox)}
						onClick={() => onClick(todo)}
						tabIndex={0}
						onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleSpace(todo, e)}
						>
						<CheckboxIsNotDone data-testid="checkbox is not done"/>
					</div>						
				)
			}			
		}

		setCheckBox(updatedCheckBox())
	}

	const todoEdit = (currentTodo: ITodo) => {
		const reqLink = API.editTodo + currentTodo._id
		const newTodo = {
			title: currentTodo.title,
			completed: !currentTodo.completed,
			deleted: currentTodo.deleted
		}

		setLoading(true)

		axios
			.put(reqLink, newTodo)
			.then(res => {
				setLoading(false)
				currentTodo.completed = !currentTodo.completed
				constructCheckBox(currentTodo.completed)		
			})
			.catch(e => {
				setLoading(false)
				console.log('Error:', e)
				setError(true)
				setTimeout(() => {
					setError(false)
				}, 1000)		
			})
	}

	const onClick = (currentTodo: ITodo) => {

		todoEdit(currentTodo)
	}

	const handleSpace = (currentTodo: ITodo, e: KeyboardEvent<HTMLDivElement>) => {
		if (e.code !== 'Space') {
			return
		}

		todoEdit(currentTodo)
	}

	return (
		<div {...props} className={cn(className, {
					[styles.error]: error,
					[styles.loading]: loading
					})}>
			{checkBox}		
		</div>	
	)		
}