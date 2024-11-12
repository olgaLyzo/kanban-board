import css from './footer.module.scss'
import { useTasks } from "../../contexts/use-task";

export const Footer = ()=>{
	const{getActiveTasksCount, getFinishedTasksCount} = useTasks();
	const creator = "Olga Lyzo";
	const year = new Date().getFullYear();

	return (
		<footer className = {css.footer} >
			<section className = {css.active_tasks}>Active tasks: {getActiveTasksCount()}</section>
			<section className = {css.finished_tasks}>Finished tasks: {getFinishedTasksCount()}</section>
			<section className = {css.info}>Kanban board by {creator}, {year}</section>
		</footer>
	)
}