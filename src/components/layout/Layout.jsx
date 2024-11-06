import { TaskProvider } from '../../contexts/task-provider';
import { LayoutProvider } from '../../contexts/layout-provider';
import css from './layout.module.scss';

export const Layout = (props)=>{
	return (
		<TaskProvider>
			<LayoutProvider>
				<div className={css.layout}>{props.children}</div>
      </LayoutProvider>
		</TaskProvider>
				
	)
}