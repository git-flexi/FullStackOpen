const Filter = ({ filterValue, filterChange }) => {
    return (
        <div>
            Filter names by: <input value={filterValue} onChange={filterChange} />
        </div>
    );
};

export default Filter;