import {
  toRef, toRefs, reactive, computed,
} from 'vue';

const person = reactive({
  firstName: 'Dmitrii',
  lastName: 'Kilishek',
});

const justObj = { name: 'Bob', lName: 'Fett' };

console.log(toRefs(justObj));


// toRefs takes reactive object only. Will not work for just object
const refPerson = toRefs(person);
console.log(person.firstName);
console.log(refPerson.firstName);


// Destructuring removes reactivity from the object
// const { firstName, lastName } = person;

// Using toRef makes each property reactive
// const firstName = toRef(person, 'firstName');
// const lastName = toRef(person, 'lastName');

// Destructuring with Reactivity
const { firstName, lastName } = toRefs(person);


// const title = `${person.value.name} the Great`;
const title = computed(() => `${firstName.value} ${lastName.value} the Great`);

console.log(title.value);

person.firstName = 'Peter';
console.log(title.value);

person.lastName = 'Shwarzemuller';
console.log(title.value);

// const title = `${person.name.value} the Great`;
// console.log(title);

// person.name = 'Peter';
// console.log(title);


// const name = ref('Dmitrii');
// console.log(name.value);
// const title = computed(() => `${name.value} the Great`);
// // const title = ref(`${name.value} the Great`);
// console.log(title.value);

// name.value = 'Peter';
// console.log(title.value);
