const t = [1, 2, 3];
const m1 = t.map(value => value * 2);

console.log(m1);

const m2 = t.map(value => '<li>' + value + '</li>');
console.log(m2);

// ---------------------------

const arr = [1, 2, 3, 4, 5];

const [first, second, ...rest] = arr;

console.log(first, second);
console.log(rest);

// ---------------------------

const object1 = {
  names: "Arto Hellas",
  age: 35,
  education: "PhD"
}

const object2 = {
  name: "Full Stack web application development",
  level: "intermediate studies",
  size: 5,
}

const object3 = {
  name: {
    first: "Dan",
    last: "Abramov",
  },
  grades: [2, 3, 5, 3],
  department: "Stanford University",
}
