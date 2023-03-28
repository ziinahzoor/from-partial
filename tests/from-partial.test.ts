import { FromPartial } from '../src/from-partial';

class Person extends FromPartial<Person> {
	firstName: string;
	lastName: string;

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}
}

const partialPerson: Person = {
	firstName: 'Rafael',
	lastName: 'Santos',
} as Person;

const person: Person = new Person(partialPerson);

describe('from-partial module', () => {
	test("partial person can't access fullName", () => {
		expect(partialPerson.fullName).toBeUndefined();
	});

	test('person can access fullName', () => {
		expect(person.fullName).toBe('Rafael Santos');
	});
});
