import type { IButton } from "../../interfaces/IButtonProps";
import styles from "./MyButton.module.css";
const MyButton = ({ children, type, onClick }: IButton) => {
	return (
		<button onClick={onClick} type={type} className={styles.btn}>
			{children}
		</button>
	);
};

export default MyButton;
