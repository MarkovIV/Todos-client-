import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ITodo } from '../../interfaces/todo.interface'

export interface CheckboxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	todo: ITodo
}