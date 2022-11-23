import { useContext, useEffect, useState } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { NavbarProps } from './Navbar.props'
import { ReactComponent as Delete } from './icons/delete.svg'
import { ReactComponent as Finish } from './icons/finish.svg'
import { ReactComponent as Github } from './icons/github.svg'
import { ReactComponent as Start } from './icons/start.svg'
import styles from './Navbar.module.css'
import cn from 'classnames'
import { API } from '../../api/api'
import axios from 'axios'
import { ITodo } from '../../interfaces/todo.interface'

export const Navbar = ({ className, ...props }: NavbarProps): JSX.Element => {
	const {todosListFilter, todosListFilterSet, todosListUpdate} = useContext(TodosContext)
	const [navbarView, setNavbarView] = useState<JSX.Element>(<></>)

	useEffect(() => {
		constructNavbarView(todosListFilter)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todosListFilter])

	const constructNavbarView = (currentTodosListFilter: string) => {
		const todosElement = document.querySelector('#todos') as HTMLElement

		const updatedNavbarView = (): JSX.Element => {
			let classFilter = ''

			switch (currentTodosListFilter) {
			case 'all':
				classFilter = styles.onAll
				break;	
			case 'active':
				classFilter = styles.onActive
				break;	
			case 'completed':
				classFilter = styles.onCompleted
				break;	
			default:
				classFilter = styles.onAll
			}

			return (
				<>
					<div {...props} className={cn(className, styles.navbar, classFilter)} data-testid="navbar">
						<div className={styles.start}><button onClick={gotoStart}><Start /></button></div>
						<div className={styles.finish}><button><a href='#statline'><Finish /></a></button></div>
						<div className={styles.clear}><button onClick={clearCompleted} data-testid="delete button"><Delete /></button></div>	
						<div></div>
						<div className={styles.all}><button onClick={filterSetAll} data-testid="filter set all button">All</button></div>
						<div className={styles.active}><button onClick={filterSetActive} data-testid="filter set active button">Active</button></div>
						<div className={styles.completed}><button onClick={filterSetCompleted} data-testid="filter set completed button">Completed</button></div>
						<div></div>	
						<div></div>			
						<div></div>
						<div className={styles.github}><button><a href="https://github.com/MarkovIV" target="_blank" rel='noreferrer'><Github /></a></button></div>			
					</div>	
				</>
			)			
		}

		const gotoStart = () => {	
			if (todosElement) {
				const coords = todosElement.getBoundingClientRect();

				todosElement.style.cssText = `position: fixed; top: 0; left: ${coords.left + "px"};`

				setInterval(() => {todosElement.style.cssText = ""}, 1);		
			}
		}

		setNavbarView(updatedNavbarView())
	}

	const filterSetAll = () => {
		todosListFilterSet('all')
	}

	const filterSetActive = () => {
		todosListFilterSet('active')
	}

	const filterSetCompleted = () => {
		todosListFilterSet('completed')
	}

	const clearCompleted = () => {	
		axios.get(API.getTodos)
			.then( res => {			
				const todosRes: ITodo[] = res.data
				const todosCompleted = todosRes.filter( todo => todo.completed )

				todosCompleted.forEach( t => {
					const reqLink = API.editTodo + t._id
					const newTodo = {
						title: t.title,
						completed: t.completed,
						deleted: t.completed
						}

					axios
						.put(reqLink, newTodo)
						.then(resp => {
							t.deleted = true	

							todosListUpdate()	
						})
						.catch(err => {
							console.log('Error:', err)			
						})
				})
			})
			.catch( e => {
				console.log('Error:', e)			
			})		
	}

	return (
		<div {...props} className={className}>
			{navbarView}		
		</div>		
	)
}