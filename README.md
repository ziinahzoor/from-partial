# From Partial

Consider an application that defines a Person class as

```tsx
class Person {
	firstName: string;
	middleName: string;
	lastName: string;

	get fullName() {
		return `${this.firstName} ${this.middleName} ${this.lastName}`;
	}
}
```

Now, the application retrieves a list of Persons from the back-end using [RxJS](https://rxjs.dev/). To avoid unnecessary overhead, the back-end does not send the `fullName` getter, as it can be resolved through other fields.

So, the response array object, even if typed as `Person`, is actually a `Partial<Person>`, and if you try to access `fullName`, it will return `undefined`, so it's necessary to instantiate a `Person` for it to be available.

It could be cumbersome to manually assign each field after instantiating the object, specially in larger classes. That's where From Partial comes in to simplify that logic. Just extend the `FromPartial` abstract class

```tsx
class Person extends FromPartial<Person> {
	...
}
```

and instantiate the object with the partial object as a parameter.

```tsx
const persons$ = partialPersons$
.pipe(
	map((partialPerson) => new Person(partialPerson))
)
.subscribe(...);
```

Now the `fullName` getter is available for every object that came from the back-end.

## Usage notes

-   Please do note that considering the language implementation, subclass fields are initialized after the superclass construction logic, so if you define an initializer for a field of a class that inherits from `FromPartial`, the initializer value will overwrite the partial object value.
