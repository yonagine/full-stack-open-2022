const Filter = ({value, onChange}) => {
    return (
        <>
            Find countries: <input value={value} onChange={onChange} />
        </>
    )
}

export default Filter;