import css from './card.module.scss'
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/buttons/button/Button";
import { CloseIcon } from "../../../shared/icons/CloseIcon.jsx";

export const Card = (props) => {
	const navigate = useNavigate();
	return (
			<div className={css.card} onClick={() => navigate(`/tasks/${props.id}`)}>
					<span className={css.name}>{props.name}</span>
					<Button 
						className={css['button-remove']} 
						onClick={(e) =>{
								props.onClickRemoveTask(props.id)
								e.stopPropagation();
						}}>
						<CloseIcon/>
					</Button>
			</div>
	)
}
