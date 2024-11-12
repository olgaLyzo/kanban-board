import { Scrollbars } from 'react-custom-scrollbars-2';
import { useLayout } from '../../../contexts/use-layout';
import { useTasks } from '../../../contexts/use-task';
import { Card } from './card/Card';
import { useState } from 'react';
import css from './column.module.scss';

export const Column = (props)=>{
  const [isInputShown, setInputShown] = useState(false);
	const [isSelectShown, setSelectShown] = useState(false);
	const [selectedTask, setSelectedTask] = useState(undefined);
	const [inputValue, setInputValue] = useState('');
	const [isAddingTask, setAddingTask] = useState(false);
	const {mainContentHeight} = useLayout();
	const {getTasksByState, getTasksByExcludedState, addTask, removeTask, moveTask} = useTasks();
	const tasks = getTasksByState(props.state);
	const onChangeInput = (e)=>{
		setInputValue(e.target.value)
	}

	return (	
		<div className = {css.column}>
			<div className={css.title}>{props.name}</div>
			<div className={css.content_wrapper}>
				<div className={css.body}>
					{
						tasks.length > 0 && 
						<Scrollbars autoHeightMax={mainContentHeight} autoHide autoHeight>
						{
							tasks.map((task, index) => <Card 
								key={index} 
								id={task.id} 
								name={task.name} 
								onClickRemoveTask={(id) => {removeTask(id)}}/>)
						}
						</Scrollbars>
					}			
					{isInputShown && (
						<div className={css.input}>
							<input 
							  className={css.input_block}
								type='text' 
								placeholder='Write some task'
								value={inputValue} 
								onChange={onChangeInput}
							/> 
						</div>
					)}	
					{isSelectShown && (
						<select 
							className={css.select_block} 
							onChange={(e)=>{
								setSelectedTask(e.target.value)
							}}
						>
							<option>Select some task</option>
							{
								getTasksByExcludedState(props.state).map((task, index) => (
								<option 
									key={index} 
									value={task.id}
								>{task.name}</option>
								))
							}
						</select>
					)}
				</div>
				<div className={`${css.footer} ${isAddingTask ? css.active : ""}`}> 
					{
						(!isInputShown || !isSelectShown)
							&& (
									<button 
										className={css.button_add}
										type='button'
										onClick={() => {
											if(props.state === 'backlog'){ 
												setInputShown(true);
												setInputValue('');
											}else{
												setSelectShown(true)
											}
											setAddingTask(true);
										}}
									> + Add card
									</button>
							)
					}
					{
						(isInputShown || isSelectShown)
						&& (
									<button
										type='button'
										id='btn-submit'
										disabled={!selectedTask && !inputValue}
										className={css.button_submit}
										onClick={()=>{
											if(props.state === 'backlog'){												
												if(!tasks.find(task => task.name === inputValue)){ 
													addTask(inputValue);
													setInputShown(false);
												}else{
													alert('Task already exists')
                          setInputValue('');
													setInputShown(false);
												}
											}else{
												setSelectShown(false);
												moveTask(selectedTask, props.state)
											} 
											setAddingTask(false);
										}
									}
									>Submit
									</button>
								)
					}
				</div>
			</div>
		</div>
)
}
			
							
					
				
				
					 
				