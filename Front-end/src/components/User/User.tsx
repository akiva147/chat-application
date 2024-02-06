import { TUser } from 'src/types/general.types'
import classes from './user.module.scss'
import classNames from 'classnames'

export interface UserProps {
    user: TUser
}

export const User = ({ user }: UserProps) => {
    return (
        <li className={classNames([classes['connected-user']])}>
            <img src="/assets/user.png" alt="Unknown User" />
            <span>{user.username}</span>
        </li>
    )
}
