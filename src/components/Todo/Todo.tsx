import { TodoProps } from './Todo.props'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'
import styles from './Todo.module.css'
import cn from 'classnames'

export const Todo = ({ todo, className, ...props }: TodoProps): JSX.Element => {
	
	return (
		<div {...props} className={cn(className, styles.todo)} data-testid="todo">
			<Checkbox className={styles.checkbox} todo={todo} />
			<Input className={styles.input} todo={todo} />
		</div>	
	)		
}