export interface IButton {
	type: "button" | "submit" | "reset";
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}
