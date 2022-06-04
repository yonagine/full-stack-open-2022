const PersonForm = ({onSubmit, name, number, handleName, handleNumber}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={name} onChange={handleName} />
            </div>
            <div>
                Number: <input value={number} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )

}

export default PersonForm;