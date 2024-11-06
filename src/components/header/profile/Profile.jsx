import { IconChevron } from '../../shared/icons/IconChevron';
import { Avatar } from '../../shared/icons/Avatar';
import css from './profile.module.scss';
import {useState} from 'react';

export const Profile = ()=>{
	const [isMenuShown, setMenuShown] = useState(false);

	return (
		<div className={css.profile}>
			<div className={css.avatar}>
				<Avatar />
			</div>
      <div className={css.icon} onClick={()=>setMenuShown(!isMenuShown)}>
        		<IconChevron />
      </div>
      {isMenuShown && (
        <div className={css.menu}>
          <div className={css.menuItem}>
            Profile
          </div>
          <div className={css.menuItem}>
            Log out
          </div>
        </div>
      )}
    </div>
	)
}