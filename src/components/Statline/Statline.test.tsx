import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Statline } from './Statline'
import { todos } from '../../data/todos'

describe('Statline, common', () => {

	test('should be rendered', () => {	
		render(<Statline />)
  		expect(screen.getByTestId('statline')).toBeInTheDocument()     
  	})  	
})

describe('Statline, values', () => {	

	test('check total todos value', () => {
		const num = todos.filter(todo => todo.deleted !== true).length
		render(<Statline />)
  		expect(screen.getByTestId('statline total')).toHaveTextContent(`Total: ${num}`)	
	})	

	test('check completed todos value', () => {
		const num = todos.filter(todo => (todo.deleted !== true && todo.completed)).length
		render(<Statline />)
  		expect(screen.getByTestId('statline completed')).toHaveTextContent(`Completed: ${num}`)	
	})	
	
	test('check active todos value', () => {
		const num = todos.filter(todo => (todo.deleted !== true && !todo.completed)).length
		render(<Statline />)
  		expect(screen.getByTestId('statline active')).toHaveTextContent(`Active: ${num}`)	
	})
})