import axios from "axios";

const instance = axios.create({
	baseURL:
		"https://react-axios-c5f41-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
