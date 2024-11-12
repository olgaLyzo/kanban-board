import { useEffect, useState } from "react";
import { TaskContext } from '../contexts/task-context';

export const TaskProvider = (props)=>{
	
	const [tasks, setTasks] = useState([]);
	const [isLoaded, setLoaded] = useState(false);
	
	const [states] = useState([
		  {id: 1, name: 'Backlog', state: 'backlog'},
      {id: 2, name: 'Ready', state: 'ready'},
      {id: 3, name: 'In progress', state: 'inProgress'},
			{id: 4, name: 'Finished', state: 'finished'},
  ]);

	const findTaskById = (id) => tasks.find(task => task.id === parseInt(id));
	
	useEffect(()=>{
		if(isLoaded){
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	},[isLoaded, tasks]);

	useEffect(()=>{
		const tasks = localStorage.getItem('tasks');
		if(tasks){
			setTasks(JSON.parse(tasks));
		}
		setLoaded(true);
	},[])

	const context = {
		states,
		addTask: (name)=>{
			const id = (new Date()).getTime();
		  const task = {
				id, 
				name, 
				state: 'backlog'
			};
			setTasks([...tasks, task]);
		},
		updateTask: (item)=>{
			const task = findTaskById(item.id);
			task.name = item.name;
			task.description = item.description;
			setTasks([...tasks]);
		},
		removeTask: (id)=>{
			const task = findTaskById(id);
			if(task){
				setTasks([...tasks.filter(item => 
					item.id !== task.id
					)]);
			}
		},
		getTaskById: findTaskById,
		getTasksByState: (state)=>{
			return tasks.filter(task => task.state === state);
		},
		getTasksByExcludedState: (state)=>{
			return tasks.filter(task => task.state !== state);
		},
		moveTask: (id, state)=>{
			const task = findTaskById(id);
			if(task){
				task.state = state;
			}
			setTasks([...tasks]);
		},
		getActiveTasksCount: ()=>{
			return tasks.filter(task => task.state === 'inProgress' || task.state === 'ready').length;
		},
		getFinishedTasksCount: ()=>{
			return tasks.filter(task => task.state === 'finished').length;
		}
	};

	return (
		<TaskContext.Provider value={context}>
				{isLoaded && props.children}
		</TaskContext.Provider>
	)
}
