import { API_URL } from "../constants/api-url.constants";
import { getItem } from "../utils/storage.utils";

const getRequest = async (url, token = null) => {
	const config = {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: getItem("token"),
		},
	};
	return await request(url, config);
};

const postRequest = async (url, body = {}, token = null) => {
	const config = {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: getItem("token"),
		},
	};
	return await request(url, config);
};

const postRequestNoToken = async (url, body = {}) => {
	const config = {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	return await request(url, config);
};

const putRequest = async (url, body, token = null) => {
	const config = {
		method: "PUT",
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: token,
		},
	};
	return await request(url, config);
};

const deleteRequest = async (url, token = null) => {
	const config = {
		method: "DELETE",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			Authorization: token,
		},
	};

	return await request(url, config);
};

const request = async (url, config) => {
	let status = -1;
	let error = null;
	let result = null;

	try {
		const response = await fetch(`${API_URL}${url}`, config);
		status = response.status;
		result = await response.json();
	} catch (e) {
		error = e.message || "NetworkError";
	} finally {
		return handleResponse(result, status, error);
	}
};

const handleResponse = (result, status, error) => {
	const hasError = !result || status >= 400;
	return {
		status,
		result: hasError ? null : result,
		error: hasError ? `Result is null ${error || ""}` : null,
	};
};

export {
	getRequest,
	postRequest,
	postRequestNoToken,
	putRequest,
	deleteRequest,
};
