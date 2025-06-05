
import React, { useState } from 'react';
import { FileText, Upload, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const PQR = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    attachments: []
  });

  const [cases, setCases] = useState([
    {
      id: 'PQR-001',
      type: 'Petición',
      description: 'Solicitud de nuevo curso de Python avanzado',
      status: 'En revisión',
      date: '2024-01-15',
      response: null
    },
    {
      id: 'PQR-002',
      type: 'Queja',
      description: 'Problemas de audio en el video de la lección 3',
      status: 'Resuelto',
      date: '2024-01-10',
      response: 'Hemos actualizado el video con mejor calidad de audio. Gracias por reportar el problema.'
    },
    {
      id: 'PQR-003',
      type: 'Reclamo',
      description: 'No puedo acceder al material descargable del curso',
      status: 'Pendiente',
      date: '2024-01-08',
      response: null
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    const newCase = {
      id: `PQR-${String(cases.length + 1).padStart(3, '0')}`,
      type: formData.type,
      description: formData.description,
      status: 'Pendiente',
      date: new Date().toISOString().split('T')[0],
      response: null
    };

    setCases([newCase, ...cases]);
    setFormData({ type: '', description: '', attachments: [] });
    setActiveTab('track');

    toast({
      title: "PQR enviado exitosamente",
      description: `Tu caso ${newCase.id} ha sido registrado y será revisado pronto.`,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  const removeAttachment = (index) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: newAttachments });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pendiente':
        return <Clock className="text-yellow-500" size={20} />;
      case 'En revisión':
        return <AlertCircle className="text-blue-500" size={20} />;
      case 'Resuelto':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'En revisión':
        return 'bg-blue-100 text-blue-800';
      case 'Resuelto':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            PQR - Peticiones, Quejas y Reclamos
          </h1>
          <p className="text-lg text-gray-600">
            Tu opinión es importante para nosotros. Comparte tus comentarios y sugerencias.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 font-medium ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-skool-primary to-skool-secondary text-white shadow-md'
                : 'text-gray-600 hover:text-skool-primary'
            }`}
          >
            Crear PQR
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 font-medium ${
              activeTab === 'track'
                ? 'bg-gradient-to-r from-skool-primary to-skool-secondary text-white shadow-md'
                : 'text-gray-600 hover:text-skool-primary'
            }`}
          >
            Seguimiento
          </button>
        </div>

        {/* Create PQR Form */}
        {activeTab === 'create' && (
          <div className="card-skool animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-skool rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-semibold">Nuevo PQR</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="type" className="text-sm font-medium text-gray-700 mb-2 block">
                  Tipo de Solicitud *
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de solicitud" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petición">Petición</SelectItem>
                    <SelectItem value="Queja">Queja</SelectItem>
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                  Descripción del Caso *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe detalladamente tu petición, queja o reclamo..."
                  className="min-h-[120px] resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Sé específico y proporciona todos los detalles relevantes
                </p>
              </div>

              <div>
                <Label htmlFor="attachments" className="text-sm font-medium text-gray-700 mb-2 block">
                  Adjuntar Archivos (Opcional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-skool-primary transition-colors">
                  <input
                    type="file"
                    id="attachments"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  />
                  <label
                    htmlFor="attachments"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="text-gray-400" size={32} />
                    <span className="text-gray-600">
                      Haz clic para subir archivos o arrastra aquí
                    </span>
                    <span className="text-sm text-gray-500">
                      PDF, DOC, DOCX, JPG, PNG (máx. 10MB)
                    </span>
                  </label>
                </div>

                {/* Attached Files */}
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Archivos adjuntos:</p>
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="btn-skool w-full">
                Enviar PQR
              </Button>
            </form>
          </div>
        )}

        {/* Track Cases */}
        {activeTab === 'track' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-skool rounded-lg flex items-center justify-center">
                <Clock className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-semibold">Seguimiento de Casos</h2>
            </div>

            {cases.length === 0 ? (
              <div className="card-skool text-center py-12">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No tienes casos registrados
                </h3>
                <p className="text-gray-500 mb-4">
                  Crea tu primer PQR para comenzar el seguimiento
                </p>
                <Button
                  onClick={() => setActiveTab('create')}
                  className="btn-skool"
                >
                  Crear Primer PQR
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cases.map((caseItem, index) => (
                  <div 
                    key={caseItem.id} 
                    className="card-skool animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(caseItem.status)}
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Caso {caseItem.id}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {caseItem.type} • {caseItem.date}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">
                      {caseItem.description}
                    </p>

                    {caseItem.response && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">Respuesta:</h4>
                        <p className="text-green-700 text-sm">
                          {caseItem.response}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PQR;
