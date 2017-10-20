const db = require('./db');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');
const Promise = require('bluebird');

const campuses = [{
  name: 'Titan',
  image: '/images/titan.jpg'
}, {
  name: 'Ganymede',
  image: '/images/ganymede.jpg'
}, {
  name: 'Charon',
  image: '/images/charon.jpg'
}, {
  name: 'Enceladus',
  image: '/images/enceladus.jpg'
}, {
  name: 'Hydra',
  image: '/images/hydra.jpg'
}, {
  name: 'Io',
  image: '/images/io.jpg'
}];

const id = () => Math.round(Math.random() * (campuses.length - 1)) + 1;

const students = [
  { campusId: id(), firstName: 'Neil', lastName: 'de Grasse Tyson', age: 20, birthday: 'January 1', email: 'neil@ipa.edu' },
  { campusId: id(), firstName: 'Sally', lastName: 'Ride', age: 21, birthday: 'February 2', email: 'sally@ipa.edu' },
  { campusId: id(), firstName: 'Galileo', lastName: 'Galilei', age: 18, birthday: 'March 3', email: 'galileo@ipa.edu' },
  { campusId: id(), firstName: 'Isaac', lastName: 'Newton', age: 19, birthday: 'April 24', email: 'isaac@ipa.edu' },
  { campusId: id(), firstName: 'Jocelyn', lastName: 'Bell-Burnell', age: 22, birthday: 'May 27', email: 'jocelyn@ipa.edu' },
  { campusId: id(), firstName: 'Caroline', lastName: 'Herschel', age: 18, birthday: 'June 12', email: 'caroline@ipa.edu' },
  { campusId: id(), firstName: 'Carl', lastName: 'Sagan', age: 17, birthday: 'July 4', email: 'carl@ipa.edu' },
  { campusId: id(), firstName: 'Tycho', lastName: 'Brahe', age: 17, birthday: 'August 25', email: 'tycho@ipa.edu' },
  { campusId: id(), firstName: 'Annie', lastName: 'Jump Cannon', age: 20, birthday: 'September 10', email: 'annie@ipa.edu' },
  { campusId: id(), firstName: 'Fritz', lastName: 'Zwicky', age: 21, birthday: 'October 23', email: 'fritz@ipa.edu' },
  { campusId: id(), firstName: 'Neta', lastName: 'Bahcall', age: 22, birthday: 'November 9', email: 'neta@ipa.edu' },
  { campusId: id(), firstName: 'Vera', lastName: 'Rubin', age: 19, birthday: 'December 7', email: 'vera@ipa.edu' },
  { campusId: id(), firstName: 'Henrietta', lastName: 'Swann Leavitt', age: 19, birthday: 'January 19', email: 'henrietta@ipa.edu' },
  { campusId: id(), firstName: 'Subrahmanyan', lastName: 'Chandrasekhar', age: 23, birthday: 'February 28', email: 'subra@ipa.edu' },
  { campusId: id(), firstName: 'Maria', lastName: 'Mitchell', age: 22, birthday: 'March 31', email: 'maria@ipa.edu' },
  { campusId: id(), firstName: 'Jan', lastName: 'Oort', age: 21, birthday: 'April 22', email: 'jan@ipa.edu' },
  { campusId: id(), firstName: 'Arthur', lastName: 'Eddington', age: 18, birthday: 'May 26', email: 'arthur@ipa.edu' },
  { campusId: id(), firstName: 'Nancy', lastName: 'Roman', age: 17, birthday: 'June 17', email: 'nancy@ipa.edu' }
];

console.log('campuses', campuses);
console.log('students', students);

const createdCampuses = campuses.map(campus => Campus.create(campus));
//const builtStudents = students.map(student => Student.build(student));

console.log('built campuses', createdCampuses);
//console.log('built students', builtStudents);

db.sync({force: true})
.then( () => {
  return Promise.all(createdCampuses)
  .then((campuses) => {
    console.log(campuses);
    const createdStudents = students.map(student => Student.create(student));
    return Promise.all(createdStudents);
  })
  .catch((err) => console.log('seeding unsuccessful', err));
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});

