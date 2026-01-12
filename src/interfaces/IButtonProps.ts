export interface IButton {
	type: "button" | "submit" | "reset";
	onClick?: () => void;
	children: React.ReactNode;
}
