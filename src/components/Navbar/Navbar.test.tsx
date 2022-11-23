import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import { Todos } from '../Todos/Todos'
import { todos } from '../../data/todos'
import userEvent from '@testing-library/user-event'

describe('Navbar, common', () => {

	test('should be rendered', () => {	
		render(<Navbar />)
  		expect(screen.getByTestId('navbar')).toBeInTheDocument()     
  	})  	
})

describe('Navbar, clear button', () => {

	test('check clear button', () => {
		const num = todos.filter(todo => (todo.deleted !== true && !todo.completed)).length
		render(<Navbar />)
		userEvent.click(screen.getByTestId('delete button'))
		render(<Todos />)	
  		expect(screen.getAllByTestId('todo').length).toEqual(num)		
		expect(screen.getAllByTestId('checkbox is not done').length).toEqual(num)
		expect(screen.queryByTestId('checkbox is done')).not.toBeInTheDocument()
	})	
})