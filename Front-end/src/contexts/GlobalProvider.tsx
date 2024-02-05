import { PropsWithChildren } from 'react'

export interface GlobalProviderProps extends PropsWithChildren {}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    return <>{children}</>
}
