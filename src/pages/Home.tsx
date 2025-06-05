
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Book, MessageSquare, User, FileText } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: User,
      title: 'Inscribirse',
      description: 'Únete a nuestra comunidad educativa con un proceso de registro simple y seguro.',
      color: 'from-purple-500 to-pink-500',
      link: '/register'
    },
    {
      icon: Book,
      title: 'Capacitación',
      description: 'Accede a cursos estructurados con videos, imágenes y contenido interactivo.',
      color: 'from-blue-500 to-cyan-500',
      link: '/training'
    },
    {
      icon: MessageSquare,
      title: 'Red Social',
      description: 'Conecta con otros estudiantes, comparte experiencias y construye tu red.',
      color: 'from-green-500 to-emerald-500',
      link: '/social'
    },
    {
      icon: FileText,
      title: 'PQR',
      description: 'Sistema de peticiones, quejas y reclamos para mejorar tu experiencia.',
      color: 'from-orange-500 to-red-500',
      link: '/pqr'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-bounce-in">
            <span className="gradient-text">Plataforma maestra</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in">
            La plataforma educativa social que transforma tu manera de aprender
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/register" className="btn-skool">
              Comenzar Ahora
            </Link>
            <Link to="/training" className="bg-white/80 hover:bg-white text-skool-primary font-semibold py-3 px-6 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-lg">
              Explorar Cursos
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-skool-primary" size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Todo lo que necesitas para aprender
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa que combina educación, comunidad y soporte en un solo lugar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="card-skool group hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 gradient-text">
            Únete a nuestra comunidad en crecimiento
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1,200+', label: 'Estudiantes Activos' },
              { number: '50+', label: 'Cursos Disponibles' },
              { number: '300+', label: 'Lecciones' },
              { number: '98%', label: 'Satisfacción' }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
