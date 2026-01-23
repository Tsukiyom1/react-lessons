export interface ISelect {
	value: string;
	onChange: (value: string) => void;
	defaultValue: string;
	options: Array<{ value: string; name: string }>;
}

type TType = Omit<ISelect, "options">;
