const express = require('express');
const morgan = require('morgan');

morgan.token('requestContent', (request) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body);
    }
});

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestContent'));
app.use(express.json());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/', (req, res) => {
    return res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
    const info = `<div>
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>
    </div>`;
    return res.send(info);
});

app.get('/api/persons', (req, res) => {
    return res.json(persons);
});

const generateId = (id) => {
    if (id !== null && !persons.find(person => person.id === id)) {
        return id;
    }
    const newId = Math.floor((Math.random() * 1000000) + 1);
    return generateId(newId);
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        });
    }

    if (persons.find(person => person.name.toUpperCase() === body.name.toUpperCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        });
    }

    const person = {
        id: generateId(null),
        name: body.name,
        number: body.number
    };

    persons = persons.concat(person);
    return response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (!person) {
        return response.status(404).end();
    }

    return response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    return response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});