const PersonForm = ({ nameValue, nameChange, numberValue, numberChange, submitHandler }) => {
    return (
        <form>
            <div>
                name: <input value={nameValue} onChange={nameChange} />
            </div>
            <div>
                number: <input value={numberValue} onChange={numberChange} />
            </div>
            <div>
                <button type="submit" onClick={submitHandler}>Add Entry</button>
            </div>
        </form>
    );
};

export default PersonForm;