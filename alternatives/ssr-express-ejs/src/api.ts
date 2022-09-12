export class Api {
	readonly #BACKEND_URL: string;

	constructor({ BACKEND_URL }: { BACKEND_URL: string }) {
		this.#BACKEND_URL = BACKEND_URL;
	}

	async cart() {
		return (await fetch(`${this.#BACKEND_URL}/cart`)).json();
	}

	async products() {
		return (await fetch(`${this.#BACKEND_URL}/products`)).json();
	}
}
