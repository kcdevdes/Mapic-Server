export interface IInfoLog {
	address: string;
	url: string;
	header: any;
	body: any;
}

export interface IErrorLog {
	address: string;
	url: string;
	header: any;
	body: any;
	error: string;
	statusCode: number;
	stack: any;
	isOperational: boolean;
}
