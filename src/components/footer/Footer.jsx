import css from './footer.module.scss'
import { useTasks } from "../../contexts/use-task";

export const Footer = ()=>{
	const{getActiveTasksCount, getFinishedTasksCount} = useTasks();

	return (
		<footer className = {css.footer} >
			<span>Active task: {getActiveTasksCount()}</span>
			<span>Finished task: {getFinishedTasksCount()}</span>
		</footer>
	)
}