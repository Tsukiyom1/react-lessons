import type { IButton } from "../../interfaces/IButtonProps";
import styles from "./MyButton.module.css";
const MyButton = ({ children, type }: IButton) => {
	return (
		<button type={type} className={styles.btn}>
			{children}
		</button>
	);
};

export default MyButton;
