export interface IInputProps {
	placeholder: string;
	name: string;
	value: string;
	type: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // void это типизация говорит о том что функция ничего не вернет
}
