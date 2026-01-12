import React from "react";
import styles from "./MyInput.module.css";
import type { IInputProps } from "../../interfaces/IInputProps";

const MyInput = ({ name, onChange, placeholder, type, value }: IInputProps) => {
	return (
		<input
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			name={name}
			value={value}
			className={styles.input}
		/>
	);
};

export default MyInput;
