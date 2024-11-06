import { useTasks } from '../../../contexts/use-task';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../../shared/buttons/button/Button';
import { CloseIcon } from "../../shared/icons/CloseIcon";
import css from './card.module.scss';

export const Card = ()=>{
	const navigate = useNavigate();
	const {getTaskById, updateTask} = useTasks();
  const {cardId} = useParams();
  const [task, setTask] = useState([]);
	const defaultValue = 'This task has no description.';

  useEffect(() => {
        if (cardId) {
          setTask(getTaskById(cardId))
        }
    }, [cardId])

  const navigateBack = () => navigate(-1);
	
	return (
		<div className={css.card}>
			{ 
				task && (
					<>
						<div className={css.body}>
							<label htmlFor='taskName'> Название задания </label>
							<textarea 
								className={css.name}
								name='taskName'
								value={task.name}
								onChange={(e) => setTask({
									...task,
									name: e.target.value
								})}
							/>
							<label htmlFor='taskDescription'> Описание задания </label>
							<textarea 
								className={css.description}
								name='taskDescription'
								value={!task.description ? defaultValue : task.description}
								onChange={(e) => setTask({
									...task,
									description: e.target.value
									})}
							/>
							<Button 
								className={css['button-close']} 
								onClick={navigateBack}>
								<CloseIcon/>
							</Button>
						</div>
				</>
			)}
			
      <div className={css.footer}>
        <button 
				  className={css['button-save']}
					onClick={() => {
          updateTask(task);
        	navigateBack();
        }}>Save Card</button>
      </div>
		</div>
	)
}