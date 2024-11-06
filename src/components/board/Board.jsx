import { Column } from "./column/Column";
import { useTasks } from '../../contexts/use-task';
import css from './board.module.scss';

export const Board = () => {
	const {states} = useTasks();
  return (
		<div className={css.board}>
			{states.map(
				(state, index) =>
					(<Column 
					key={index}
					id={state.id}
					name={state.name}
					state={state.state}
				/>)
			)}
		</div>
    )
}
