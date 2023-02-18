const Persons = ({ persons, filter }) => {
    return (
        <div>
            <table>
                <tbody>
                    {
                        persons.filter((person) => {
                            return filter === '' ? true : person.name.toUpperCase().includes(filter.toUpperCase());
                        }).map((person) => {
                            return <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>;
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Persons;