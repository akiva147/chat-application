import { Button, Input } from 'antd'
import classes from './login-page.module.scss'

export interface EnterUsernameProps {
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    handleConnection: () => Promise<void>
}

export const LoginPage = ({
    username,
    setUsername,
    handleConnection,
}: EnterUsernameProps) => {
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                await handleConnection()
            }}
            className={classes['container']}
        >
            <h2>Let's chat</h2>
            <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
                required
            />
            <Button htmlType="submit">Submit</Button>
        </form>
    )
}
