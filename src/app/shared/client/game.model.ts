export interface Game {
	id: number;
	slug: string;
	title: string;
	tag?: string;
	providerName: string;
	startUrl: string;
	thumb?: Thumb;
}

interface Thumb {
	url: string;
	title: string;
}
