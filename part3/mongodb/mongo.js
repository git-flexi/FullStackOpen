const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please specifiy a password');
    process.exit(1);
}

const password = process.argv[2];

const mongoUrl = `mongodb+srv://flexifailix:${password}@cluster0.wclaptv.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log('Phonebook:');
        persons.forEach(person => {
            console.log(person.name + ' ' + person.number);
        });
        mongoose.connection.close();
    });
}

if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    });

    person.save().then(result => {
        console.log(`Added ${person.name} with number ${person.number} to phonebook`);
        mongoose.connection.close();
    });
}





