const Filter = ({ filterValue, filterChange }) => {
    return (
        <div>
            Find countries: <input value={filterValue} onChange={filterChange} />
        </div>
    );
};

export default Filter;