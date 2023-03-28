export abstract class FromPartial<T> {
	constructor(partial?: Partial<T>) {
		Object.assign(this, partial);
	}
}
