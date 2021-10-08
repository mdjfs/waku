import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Cat } from '../../types/cat'
import './login.scss'

export default function () {
    const [cat, setCat] = useState<Cat>()
    const [msg, setMsg] = useState<string>()

    async function getRandomCat() {
        const response = await fetch('/api/cat')
        const [cat]: Cat[] = await response.json()
        console.log(cat)
        setCat(cat)
    }

    useEffect(() => {
        getRandomCat()
        setMsg(messages[Math.floor(Math.random() * messages.length)])
    }, [])
    return (
        <>
            <div className="cat-container">
                <div className="cat-panel">
                    <img src={cat ? cat.url : ''} alt="Random cat."></img>
                </div>

                <div className="typewriter">
                    <h1>{msg}</h1>
                </div>
            </div>
            <div className="auth-container">
                <div className="auth-buttons">
                    <h1>Join with</h1>
                    <a href="/auth/google" className="auth-button">
                        <FontAwesomeIcon icon={faGoogle} /> Google
                    </a>
                    <a href="/auth/facebook" className="auth-button">
                        <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </a>
                </div>
            </div>
        </>
    )
}

const messages = [
    'I think the cat wants dessert!',
    "I'm in no mood to watch a cat fight tonight.",
    'The cat would like to eat the mouse.',
    'A large grey cat was asleep on a rocking chair.',
    '"First time I ever saw a pink cat," said Zeb.',
    '$cat 1 erne Ã‚° b AhDas es Ã‚° 7 r-?',
    'Could you take your cat?',
    'That was a cat, not a spider.',
    'Fred began to pick cat hairs from his blue suit.',
    'The cat was out of the bag – or the rabbit.',
    'He wondered if he had nine like a cat.',
    'He set the cat down and rose.',
    '"How about an inside cat?" she asked.',
    'We never had an inside cat.',
    'What kind of cat did you want?',
    'Destiny reached up and touched the cat.',
    "Jule's gaze fell to the cat.",
    'What kind of cat had red eyes?',
    'Wanna see my cat?',
]
