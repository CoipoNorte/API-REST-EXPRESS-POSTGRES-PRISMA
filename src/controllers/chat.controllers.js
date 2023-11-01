const prisma = require('../database/prisma.db');

// Agregar una nueva pregunta principal
exports.addMainQuestion = async (req, res) => {
	try {
		const { texto, tipo } = req.body;
		const newQuestion = await prisma.preguntas.create({
			data: {
				texto,
				tipo,
			},
		});
		res.json(newQuestion);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear la pregunta principal' });
	}
};

// Agregar una nueva pregunta secundaria
exports.addSubQuestion = async (req, res) => {
	try {
		const parentId = parseInt(req.params.parentId);
		const { texto, tipo } = req.body;
		const newSubQuestion = await prisma.preguntas.create({
			data: {
				texto,
				tipo,
				padreID: parentId, // Asociar la pregunta secundaria a la principal
			},
		});
		res.json(newSubQuestion);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear la pregunta secundaria' });
	}
};

// Agregar una nueva respuesta a una pregunta
exports.addAnswerToQuestion = async (req, res) => {
	try {
		const questionId = parseInt(req.params.questionId);
		const { texto } = req.body;
		const newAnswer = await prisma.respuestas.create({
			data: {
				texto,
				preguntaID: questionId, // Asociar la respuesta a la pregunta
			},
		});
		res.json(newAnswer);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear la respuesta para la pregunta' });
	}
};

// Obtener todas las preguntas principales
exports.getAllMainQuestions = async (req, res) => {
	try {
		const mainQuestions = await prisma.preguntas.findMany({
			where: { padreID: null },
		});
		res.json(mainQuestions);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener las preguntas principales' });
	}
};

// Obtener todas las preguntas secundarias de una pregunta principal
exports.getAllSubQuestions = async (req, res) => {
	try {
		const parentId = parseInt(req.params.parentId);
		const subQuestions = await prisma.preguntas.findMany({
			where: { padreID: parentId },
		});
		res.json(subQuestions);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener las preguntas secundarias' });
	}
};

// Obtener todas las respuestas de una pregunta
exports.getAnswersForQuestion = async (req, res) => {
	try {
		const questionId = parseInt(req.params.questionId);
		const answers = await prisma.respuestas.findMany({
			where: { preguntaID: questionId },
		});
		res.json(answers);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener las respuestas para la pregunta' });
	}
};

// Modificar una pregunta principal o secundaria
exports.updateQuestion = async (req, res) => {
	try {
		const questionId = parseInt(req.params.questionId);
		const { texto } = req.body;

		const updatedQuestion = await prisma.preguntas.update({
			where: { id: questionId },
			data: { texto },
		});

		res.json(updatedQuestion);
	} catch (error) {
		res.status(500).json({ error: 'Error al modificar la pregunta' });
	}
};

// Eliminar una pregunta principal o secundaria
exports.deleteQuestion = async (req, res) => {
	try {
		const questionId = parseInt(req.params.questionId);

		const deletedQuestion = await prisma.preguntas.delete({
			where: { id: questionId },
		});

		res.json(deletedQuestion);
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar la pregunta' });
	}
};

// Obtener una pregunta principal por su ID
exports.getMainQuestionById = async (req, res) => {
	try {
		const questionId = parseInt(req.params.questionId);
		const mainQuestion = await prisma.preguntas.findUnique({
			where: { id: questionId, padreID: null },
		});

		if (!mainQuestion) {
			return res.status(404).json({ error: 'Pregunta principal no encontrada' });
		}

		res.json(mainQuestion);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener la pregunta principal' });
	}
};

// Obtener una pregunta secundaria por ID
exports.getSubQuestionById = async (req, res) => {
	try {
		const parentId = parseInt(req.params.parentId);
		const questionId = parseInt(req.params.questionId);
		const subQuestion = await prisma.preguntas.findUnique({
			where: { id: questionId, padreID: parentId },
		});

		if (!subQuestion) {
			return res.status(404).json({ error: 'Pregunta secundaria no encontrada' });
		}

		res.json(subQuestion);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener la pregunta secundaria' });
	}
};

// Eliminar todas las preguntas y respuestas
exports.clearChat = async (req, res) => {
	try {
		// Elimina todas las preguntas y respuestas
		await prisma.preguntas.deleteMany();
		await prisma.respuestas.deleteMany();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar todas las preguntas y respuestas' });
	}
};

module.exports = exports;