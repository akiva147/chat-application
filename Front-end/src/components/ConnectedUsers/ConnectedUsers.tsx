import classes from './connected-users.module.scss'
import { User } from '../User'
import { TUser } from 'src/types/general.types'

export interface ConnectedUsersProps {
    connectedUsers: TUser[]
}

export const ConnectedUsers = ({ connectedUsers }: ConnectedUsersProps) => {
    return (
        <div className="connected-users">
            <h2>Connected Users</h2>

            <ul>
                {connectedUsers.map((user) => (
                    <User user={user} key={user.id} />
                ))}
            </ul>
        </div>
    )
}
