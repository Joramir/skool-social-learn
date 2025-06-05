
import React, { useState } from 'react';
import { Book, Play, Image, FileText, MessageSquare, ChevronDown, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Training = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [newComment, setNewComment] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Desarrollo Web Frontend',
      description: 'Aprende HTML, CSS, JavaScript y React desde cero',
      color: 'from-blue-500 to-cyan-500',
      lessons: [
        {
          id: 1,
          title: 'Introducción a HTML',
          type: 'video',
          content: 'https://www.youtube.com/embed/UB1O30fR-EE',
          description: 'Conceptos básicos de HTML y estructura de documentos web.',
          comments: [
            { id: 1, user: 'Ana García', text: '¡Excelente explicación!', time: '2 horas' },
            { id: 2, user: 'Carlos López', text: '¿Podrías explicar más sobre las etiquetas semánticas?', time: '1 hora' }
          ]
        },
        {
          id: 2,
          title: 'CSS Fundamentos',
          type: 'video',
          content: 'https://www.youtube.com/embed/1Rs2ND1ryYc',
          description: 'Estilos, selectores y propiedades CSS esenciales.',
          comments: []
        },
        {
          id: 3,
          title: 'JavaScript Básico',
          type: 'text',
          content: `
            # JavaScript Básico
            
            ## Variables y Tipos de Datos
            
            JavaScript es un lenguaje dinámico que permite crear interactividad en las páginas web.
            
            ### Declaración de Variables
            
            \`\`\`javascript
            let nombre = "Juan";
            const edad = 25;
            var ciudad = "Madrid";
            \`\`\`
            
            ### Tipos de Datos
            
            - **String**: Cadenas de texto
            - **Number**: Números enteros y decimales
            - **Boolean**: true o false
            - **Array**: Listas de elementos
            - **Object**: Objetos con propiedades
          `,
          description: 'Fundamentos de programación con JavaScript.',
          comments: []
        }
      ]
    },
    {
      id: 2,
      title: 'Diseño UX/UI',
      description: 'Principios de diseño centrado en el usuario',
      color: 'from-purple-500 to-pink-500',
      lessons: [
        {
          id: 4,
          title: 'Principios de UX',
          type: 'image',
          content: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
          description: 'Conceptos fundamentales del diseño de experiencia de usuario.',
          comments: []
        },
        {
          id: 5,
          title: 'Wireframes y Prototipos',
          type: 'video',
          content: 'https://www.youtube.com/embed/qYvocWFTlmI',
          description: 'Cómo crear wireframes efectivos y prototipos interactivos.',
          comments: []
        }
      ]
    },
    {
      id: 3,
      title: 'Marketing Digital',
      description: 'Estrategias digitales para hacer crecer tu negocio',
      color: 'from-green-500 to-emerald-500',
      lessons: [
        {
          id: 6,
          title: 'SEO Básico',
          type: 'text',
          content: `
            # SEO Básico
            
            ## ¿Qué es SEO?
            
            SEO (Search Engine Optimization) es el proceso de optimizar tu sitio web para mejorar su visibilidad en los motores de búsqueda.
            
            ## Elementos Clave
            
            1. **Palabras Clave**: Investiga y selecciona términos relevantes
            2. **Contenido de Calidad**: Crea contenido valioso para tu audiencia
            3. **Optimización Técnica**: Mejora la velocidad y estructura del sitio
            4. **Enlaces**: Construye autoridad con enlaces de calidad
          `,
          description: 'Fundamentos del posicionamiento en buscadores.',
          comments: []
        }
      ]
    }
  ];

  const handleAddComment = (lessonId) => {
    if (newComment.trim()) {
      const lesson = selectedCourse.lessons.find(l => l.id === lessonId);
      lesson.comments.push({
        id: Date.now(),
        user: 'Usuario Actual',
        text: newComment,
        time: 'ahora'
      });
      setNewComment('');
    }
  };

  const renderLessonContent = (lesson) => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="aspect-video mb-6">
            <iframe
              src={lesson.content}
              className="w-full h-full rounded-lg"
              allowFullScreen
              title={lesson.title}
            />
          </div>
        );
      case 'image':
        return (
          <div className="mb-6">
            <img
              src={lesson.content}
              alt={lesson.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        );
      case 'text':
        return (
          <div className="prose max-w-none mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <pre className="whitespace-pre-wrap font-sans text-gray-700">
                {lesson.content}
              </pre>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setSelectedLesson(null)}
            variant="outline"
            className="mb-6"
          >
            ← Volver al curso
          </Button>

          <div className="card-skool animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              {selectedLesson.type === 'video' && <Play className="text-skool-primary" size={24} />}
              {selectedLesson.type === 'image' && <Image className="text-skool-primary" size={24} />}
              {selectedLesson.type === 'text' && <FileText className="text-skool-primary" size={24} />}
              <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
            </div>
            
            <p className="text-gray-600 mb-6">{selectedLesson.description}</p>

            {renderLessonContent(selectedLesson)}

            {/* Comments Section */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="text-skool-primary" size={20} />
                <h3 className="text-lg font-semibold">Comentarios y Discusión</h3>
              </div>

              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Comparte tus dudas o comentarios sobre esta lección..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 focus:ring-2 focus:ring-skool-primary focus:border-transparent"
                />
                <Button
                  onClick={() => handleAddComment(selectedLesson.id)}
                  className="btn-skool mt-2"
                  disabled={!newComment.trim()}
                >
                  Publicar Comentario
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {selectedLesson.comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Sé el primero en comentar esta lección
                  </p>
                ) : (
                  selectedLesson.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-skool-primary">
                          {comment.user}
                        </span>
                        <span className="text-sm text-gray-500">
                          hace {comment.time}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setSelectedCourse(null)}
            variant="outline"
            className="mb-6"
          >
            ← Volver a cursos
          </Button>

          <div className="card-skool animate-fade-in">
            <div className={`w-full h-32 bg-gradient-to-r ${selectedCourse.color} rounded-lg mb-6 flex items-center justify-center`}>
              <h1 className="text-3xl font-bold text-white text-center">
                {selectedCourse.title}
              </h1>
            </div>

            <p className="text-gray-600 mb-8 text-lg">
              {selectedCourse.description}
            </p>

            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Book className="text-skool-primary" size={24} />
              Lecciones del Curso
            </h2>

            <div className="space-y-4">
              {selectedCourse.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-skool-primary to-skool-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.type === 'video' && <Play className="text-skool-primary" size={18} />}
                        {lesson.type === 'image' && <Image className="text-skool-primary" size={18} />}
                        {lesson.type === 'text' && <FileText className="text-skool-primary" size={18} />}
                        <h3 className="font-medium text-gray-800 group-hover:text-skool-primary transition-colors">
                          {lesson.title}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown className="text-gray-400 group-hover:text-skool-primary transition-colors transform group-hover:translate-x-1" size={20} />
                  </div>
                  <p className="text-gray-600 text-sm mt-2 ml-12">
                    {lesson.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Capacitación
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestros cursos estructurados con contenido multimedia interactivo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="card-skool cursor-pointer group hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-full h-32 bg-gradient-to-r ${course.color} rounded-lg mb-4 flex items-center justify-center`}>
                <Book className="text-white" size={48} />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-skool-primary transition-colors">
                {course.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {course.lessons.length} lecciones
                </span>
                <ArrowDown className="text-skool-primary group-hover:translate-x-1 transition-transform" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training;
