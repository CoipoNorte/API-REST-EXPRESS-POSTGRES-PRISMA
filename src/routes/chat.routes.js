const { Router } = require('express');
const chatControllers = require('../controllers/chat.controllers');

const router = Router();

// Agregar una nueva pregunta principal
router.post('/', chatControllers.addMainQuestion);

// Agregar una nueva pregunta secundaria
router.post('/:parentId/questions', chatControllers.addSubQuestion);

// Agregar una nueva respuesta a una pregunta
router.post('/:questionId/answers', chatControllers.addAnswerToQuestion);

// Obtener todas las preguntas principales
router.get('/main', chatControllers.getAllMainQuestions);

// Obtener todas las preguntas secundarias de una pregunta principal
router.get('/:parentId/questions', chatControllers.getAllSubQuestions);

// Obtener todas las respuestas de una pregunta
router.get('/:questionId/answers', chatControllers.getAnswersForQuestion);

// Modificar una pregunta principal o secundaria
router.put('/:questionId', chatControllers.updateQuestion);

// Eliminar una pregunta principal o secundaria
router.delete('/:questionId', chatControllers.deleteQuestion);

// Obtener una pregunta principal por su ID
router.get('/main/:questionId', chatControllers.getMainQuestionById);

// Obtener una pregunta secundaria por ID
router.get('/:parentId/questions/:questionId', chatControllers.getSubQuestionById);

// Eliminar todas las preguntas y respuestas
router.delete('/clear', chatControllers.clearChat);

module.exports = router;
