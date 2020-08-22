export default async (req, res) => {
	const files = req.files.files;
	console.log(files);
	res.json(files);
}
