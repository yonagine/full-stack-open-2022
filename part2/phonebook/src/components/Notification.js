const Notification = ({message}) => {
    return (
        message === null ?
        null : 
        message.startsWith("ERROR: ") ? 
        <div className="errornotif">{message}</div> :
        <div className="successnotif">{message}</div>
    )
}

export default Notification;