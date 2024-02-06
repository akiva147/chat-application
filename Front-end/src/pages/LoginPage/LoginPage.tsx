import classes from './login-page.module.scss'

export interface EnterUsernameProps {
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    handleConnection: () => void
}

export const LoginPage = ({
    username,
    setUsername,
    handleConnection,
}: EnterUsernameProps) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleConnection()
            }}
            className="enter-username-form"
        >
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
                required
            />
            <button type="submit">Submit</button>
        </form>
    )
}
