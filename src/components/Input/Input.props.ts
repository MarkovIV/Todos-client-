import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { ITodo } from '../../interfaces/todo.interface'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	todo?: ITodo
	
}