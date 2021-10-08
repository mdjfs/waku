import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './loading.scss'

export default function () {
    return (
        <div className="loading-root">
            <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon>
        </div>
    )
}
