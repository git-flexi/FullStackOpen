const PersonForm = ({ person, changeHandler, submitHandler }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input name='name' value={person.name} onChange={changeHandler} />
            </div>
            <div>
                number: <input name='number' value={person.number} onChange={changeHandler} />
            </div>
            <div>
                <button type="submit">Add Entry</button>
            </div>
        </form>
    );
};

export default PersonForm;