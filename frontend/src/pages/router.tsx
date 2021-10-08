import React, { Suspense, useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { User } from '../types/user'
import Loading from './loading'

const Login = React.lazy(() => import('./login'))
const Viewer = React.lazy(() => import('./viewer'))

export default function WakuRouter() {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    async function getUser() {
        const response = await fetch('/auth/status')
        if (response.status === 200) {
            const user: User = await response.json()
            setUser(user)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    if (loading) return <Loading></Loading>

    return (
        <Router>
            <Switch>
                <Route exact path={'/'}>
                    <Redirect to={user ? '/viewer' : '/login'}></Redirect>
                </Route>
                <Route exact path={'/viewer'}>
                    <Suspense fallback={<Loading></Loading>}>
                        <Viewer />
                    </Suspense>
                </Route>
                <Route exact path={'/login'}>
                    <Suspense fallback={<Loading></Loading>}>
                        <Login />
                    </Suspense>
                </Route>
            </Switch>
        </Router>
    )
}
