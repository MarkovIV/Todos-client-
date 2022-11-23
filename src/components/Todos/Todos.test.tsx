import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Todos } from './Todos'
import { todos } from '../../data/todos'

describe('Todos list, common', () => {

	test('should displayed', () => {	
		render(<Todos />)
  		expect(screen.getByTestId('todos list')).toBeInTheDocument()     
  	})  	
})

describe('Todos list, todos count', () => {	

	test('should displayed all not deleted todos (filter\'s value is \'all\')', () => {
		render(<Todos />)
  		expect((screen.getAllByTestId('todo')).length).toEqual((todos.filter(todo => !todo.deleted)).length)		
	})	

	test('should displayed all not deleted and completed todos with marked checkbox (filter\'s value is \'all\')', () => {
		render(<Todos />)
  		expect((screen.getAllByTestId('checkbox is done')).length).toEqual((todos.filter(todo => (!todo.deleted && todo.completed))).length)		
	})	

	test('should displayed all not deleted and not completed todos with unmarked checkbox (filter\'s value is \'all\')', () => {
		render(<Todos />)
		expect((screen.getAllByTestId('checkbox is not done')).length).toEqual((todos.filter(todo => (!todo.deleted && !todo.completed))).length)	
	})	
})
