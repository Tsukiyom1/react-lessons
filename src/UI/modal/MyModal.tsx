import type { IModalProps } from "../../interfaces/IModalProps";
import styles from "./MyModal.module.css";
const MyModal = ({ children, setVisible, visible }: IModalProps) => {
	const rootClasses = [styles.modal];
	if (visible) {
		rootClasses.push(styles.active);
	}
	return (
		<div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
			<div className={styles.content} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default MyModal;
