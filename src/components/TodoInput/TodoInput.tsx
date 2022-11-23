import { TodoInputProps } from './TodoInput.props'
import { Input } from '../Input/Input'
import { useContext, useState } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { ReactComponent as Enter } from './icons/enter.svg'
import styles from './TodoInput.module.css'
import cn from 'classnames'
import axios from 'axios'
import { API } from '../../api/api'

export const TodoInput = ({ className, ...props }: TodoInputProps): JSX.Element => {
	const [value, setValue] = useState<string>('')
	const {todosList, todosListUpdate} = useContext(TodosContext)
	const [loading, setLoading] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault()

		if (value.trim().length === 0) {
			return
		}

		createTodo(value)	
		
		setValue('')
 	 }

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const createTodo = (todoText: string) => {
		const newTodo = {
			title: todoText,
			completed: false,
			deleted: false
		}

		setLoading(true)

		axios
			.post(API.addTodo, newTodo)
			.then(res => {
				setLoading(false)
				todosList.unshift(res.data)
				todosListUpdate()		
			})
			.catch(e => {
				setLoading(false)
				console.log('Error:', e)
				setErrorMessage(e.message)
				setTimeout(() => {
					setErrorMessage('')
				}, 1000)		
			})
	}

	return (		
		<form onSubmit={submitHandler} className={cn(className, styles.todoInput)} {...props}>
			<Input
			className={styles.input}
			type="text"
			placeholder="Enter todo..."
			value={value}
			onChange={changeHandler}
			/>
			<button type="submit" className={styles.button}><Enter/></button>
			<div className={styles.status}>{loading?<span className={styles.loading}>Loading ...</span>:
					errorMessage?<span className={styles.error}>{errorMessage}</span>:<span></span>}
			</div>
		</form>
	)		
}