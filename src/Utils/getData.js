export default async function getData(URL) {
	try {
		const res = await fetch(URL);
		const data = await res.json();
		return data;
	} catch (err) {
		console.error('ha ocurrido un error en getData', err);
		return err;
	}
}
