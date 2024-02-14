import { TMessage } from 'src/types/general.types'
import classes from './message.module.scss'
import dayjs from 'dayjs'
import classNames from 'classnames'

export interface MessageProps {
    message: TMessage
    username: string
}

export const Message = ({ message, username }: MessageProps) => {
    const messageType = message.room
        ? 'joined-room'
        : message.username !== username
        ? 'received'
        : 'sended'

    return (
        <li className={classes[messageType]}>
            <p>{message.message}</p>
            {messageType !== 'joined-room' && <span>{message.username} </span>}
        </li>
    )
}
