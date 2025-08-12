const formatDate = require('./utils/date-converter');
const body = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    birthDate: new Date('1990-01-01')
}
console.log(body.name); // John Doe
console.log(body['name']); // John Doe

const {name, birthDate} = body;
console.log(name); // John Doe
console.log(formatDate(birthDate)); // 1990-01-01
