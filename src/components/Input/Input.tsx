import { InputProps } from './Input.props'
import styles from './Input.module.css'
import cn from 'classnames'

export const Input = ({ todo, className, ...props }: InputProps): JSX.Element => {
	return (
		todo?	(todo.completed?	<input className={cn(styles.input, styles.completed, className)} value={todo.title} {...props} readOnly/>:
									<input className={cn(styles.input, className)} value={todo.title} {...props} readOnly/>):
				<input className={cn(styles.input, className)} {...props} />
	)	
}