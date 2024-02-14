import { TUser } from 'src/types/general.types'
import classes from './user.module.scss'
import classNames from 'classnames'

export interface UserProps {
    user: TUser
}

export const User = ({ user }: UserProps) => {
    return (
        <li className={classNames([classes['connected-user']])}>
            <span>{user.username}</span>
            <span className={classes.dot}>•</span>
        </li>
    )
}
