export default async (req, res) => {
	const files = req.files.files;
	const classroomId = req.params.classroomId;
	console.log(classroomId);
	console.log(files);
	res.json(files);
}
