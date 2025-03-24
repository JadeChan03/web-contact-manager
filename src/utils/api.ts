/*** using fetch to handle API connections ***/

/* GET request */
export const get = async (url: string) => {
	try {
		const res = await fetch(url);

		if(!res.ok) {
			throw new Error('Network response failed');
		}

		const resData = await res.json();
		return resData;

	} catch(err) {
		console.error(`Fetch error: ${err}`);
		throw err;
	}
}

// not currently in use:

/* POST request */

// export const post = async (url: string, reqData) => {
// 	try {
// 		const res = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'ContentType': 'application/json',
// 			},
// 			body: JSON.stringify(reqData),
// 		})
// 		if(!res.ok) {
// 			throw new Error('Network response failed')
// 		}
// 		const resData = await res.json();
// 		return resData;

// 	} catch(err) {
// 		console.error(`Post error: ${err}`);
// 		throw err;
// 	}
// }