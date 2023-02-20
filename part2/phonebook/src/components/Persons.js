const Persons = ({ persons, filter, deleteHandler }) => {
    return (
        <div>
            <table>
                <tbody>
                    {
                        persons.filter((person) => {
                            return filter === '' ? true : person.name.toUpperCase().includes(filter.toUpperCase());
                        }).map((person) => {
                            return (
                                <tr key={person.id}>
                                    <td>{person.name}</td>
                                    <td>{person.number}</td>
                                    <td><button onClick={() => deleteHandler(person.id, person.name)}>delete</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Persons;