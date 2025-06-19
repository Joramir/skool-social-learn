
import React, { useState } from 'react';
import { Bot, Send, Lightbulb, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface CourseRecommendation {
  title: string;
  description: string;
  level: string;
  duration: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente de IA para recomendaciones de cursos. Cuéntame sobre tus intereses, nivel de experiencia o qué habilidades te gustaría desarrollar, y te ayudaré a encontrar el curso perfecto para ti.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const courseRecommendations: CourseRecommendation[] = [
    {
      title: "Fundamentos de Programación",
      description: "Aprende los conceptos básicos de programación con Python",
      level: "Principiante",
      duration: "6 semanas"
    },
    {
      title: "Marketing Digital",
      description: "Estrategias modernas de marketing en redes sociales",
      level: "Intermedio",
      duration: "4 semanas"
    },
    {
      title: "Diseño UX/UI",
      description: "Crea interfaces de usuario atractivas y funcionales",
      level: "Intermedio",
      duration: "8 semanas"
    },
    {
      title: "Gestión de Proyectos",
      description: "Metodologías ágiles y herramientas de gestión",
      level: "Avanzado",
      duration: "5 semanas"
    }
  ];

  const generateRecommendation = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('programación') || input.includes('código') || input.includes('desarrollo')) {
      return `Basándome en tu interés en programación, te recomiendo empezar con "Fundamentos de Programación". Este curso te dará una base sólida en Python y conceptos de programación. También podrías considerar "Diseño UX/UI" si te interesa el desarrollo frontend.`;
    }
    
    if (input.includes('marketing') || input.includes('ventas') || input.includes('negocios')) {
      return `Para tu interés en marketing y negocios, "Marketing Digital" sería perfecto para ti. Te enseñará estrategias modernas y efectivas. También considera "Gestión de Proyectos" para complementar tus habilidades empresariales.`;
    }
    
    if (input.includes('diseño') || input.includes('creativo') || input.includes('arte')) {
      return `Tu perfil creativo se alinea perfectamente con "Diseño UX/UI". Este curso te permitirá crear interfaces hermosas y funcionales. También podrías explorar "Marketing Digital" para aprender sobre branding y comunicación visual.`;
    }
    
    if (input.includes('gestión') || input.includes('liderazgo') || input.includes('equipo')) {
      return `Para desarrollar habilidades de liderazgo y gestión, te recomiendo "Gestión de Proyectos". Aprenderás metodologías ágiles y herramientas modernas. "Marketing Digital" también te ayudará a entender mejor la comunicación empresarial.`;
    }
    
    return `Gracias por compartir tus intereses. Basándome en lo que me has contado, te sugiero explorar nuestros cursos de "Fundamentos de Programación" para habilidades técnicas o "Marketing Digital" para habilidades comerciales. ¿Te gustaría que profundice en alguna área específica?`;
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simular delay de respuesta de IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateRecommendation(currentMessage),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);

    setCurrentMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bot className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Asistente IA para Cursos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Obtén recomendaciones personalizadas de cursos basadas en tus intereses y objetivos de aprendizaje
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="text-purple-500" size={24} />
                  Chat con el Asistente IA
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {!message.isUser && (
                            <Bot size={16} className="text-purple-500 mt-1 flex-shrink-0" />
                          )}
                          {message.isUser && (
                            <User size={16} className="text-white mt-1 flex-shrink-0" />
                          )}
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <Bot size={16} className="text-purple-500" />
                          <Loader2 size={16} className="animate-spin text-purple-500" />
                          <span className="text-sm text-gray-600">Analizando...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe tus intereses o qué te gustaría aprender..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Send size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="text-yellow-500" size={24} />
                  Cursos Destacados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseRecommendations.map((course, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {course.level}
                      </span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consejos de IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Sé específico sobre tus objetivos de carrera</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Menciona tu nivel de experiencia actual</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Comparte qué herramientas ya conoces</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Indica tu disponibilidad de tiempo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
