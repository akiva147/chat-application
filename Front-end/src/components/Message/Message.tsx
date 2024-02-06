import { TMessage } from 'src/types/general.types'
import classes from './message.module.scss'
import dayjs from 'dayjs'
import classNames from 'classnames'

export interface MessageProps {
    message: TMessage
    username: string
}

export const Message = ({ message, username }: MessageProps) => {
    const messageReceived = message.username !== username

    return (
        <li
            className={
                messageReceived
                    ? classes['message received']
                    : classes['message sended']
            }
        >
            <div className={classes['message-info']}>
                <span>{message.username} </span>
                <span>{dayjs().format('MM/DD/YYYY h:mm:ss').toString()}</span>
            </div>

            <p>{message.message}</p>
        </li>
    )
}
