import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const projects = [
  {
    id: 'pink-dress',
    title: 'Розовое платье',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/38413039-5102-44b9-809f-484be042e871.jpg',
    description: 'Трогательная история о поиске себя через театральное искусство.'
  },
  {
    id: 'lubyansky',
    title: 'Лубянский Гримёр',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/d9139a44-6b0f-4e6e-89aa-5176f00b97a6.jpg',
    description: 'Драматическая постановка о судьбах людей в переломные моменты истории.'
  },
  {
    id: 'lavr',
    title: 'Лавр',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/38413039-5102-44b9-809f-484be042e871.jpg',
    description: 'Философское путешествие по средневековой Руси.'
  },
  {
    id: 'tsar',
    title: 'Я убил царя',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/d9139a44-6b0f-4e6e-89aa-5176f00b97a6.jpg',
    description: 'Исторический спектакль о власти и ответственности.'
  },
  {
    id: 'ezop',
    title: 'Эзоп',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/38413039-5102-44b9-809f-484be042e871.jpg',
    description: 'Мудрость античных басен на современной сцене.'
  },
  {
    id: 'crime',
    title: 'Преступление и Наказание',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/d9139a44-6b0f-4e6e-89aa-5176f00b97a6.jpg',
    description: 'Классическая постановка по произведению Достоевского.'
  },
  {
    id: 'oborvanets',
    title: 'Оборванец',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/38413039-5102-44b9-809f-484be042e871.jpg',
    description: 'История о людях на краю общества.'
  },
  {
    id: 'mhat-sochi',
    title: 'МХАТ-Сочи',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/d9139a44-6b0f-4e6e-89aa-5176f00b97a6.jpg',
    description: 'Летний фестиваль театрального искусства.'
  },
  {
    id: 'mhat-36',
    title: 'МХАТ-36',
    cover: 'https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/38413039-5102-44b9-809f-484be042e871.jpg',
    description: 'Современная интерпретация классических произведений.'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<'bio' | 'portfolio' | 'contacts'>('bio');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [bioPhoto, setBioPhoto] = useState('https://cdn.poehali.dev/projects/c7902632-2ef1-44a0-8709-52591db735a8/files/749acd74-23a3-4b27-a87a-733a0d98e9f8.jpg');
  const [projectPhotos, setProjectPhotos] = useState<Record<string, string[]>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<{type: 'bio' | 'project', projectId?: string, photoIndex?: number} | null>(null);

  const scrollToSection = (section: 'bio' | 'portfolio' | 'contacts') => {
    setActiveSection(section);
    setSelectedProject(null);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openProject = (projectId: string) => {
    setSelectedProject(projectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      if (uploadingFor?.type === 'bio') {
        setBioPhoto(result);
      } else if (uploadingFor?.type === 'project' && uploadingFor.projectId && uploadingFor.photoIndex !== undefined) {
        setProjectPhotos(prev => ({
          ...prev,
          [uploadingFor.projectId!]: [
            ...(prev[uploadingFor.projectId!] || []),
          ].map((photo, idx) => idx === uploadingFor.photoIndex ? result : photo)
        }));
      }
      setUploadingFor(null);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (type: 'bio' | 'project', projectId?: string, photoIndex?: number) => {
    setUploadingFor({type, projectId, photoIndex});
    fileInputRef.current?.click();
  };

  const getProjectPhotos = (projectId: string) => {
    return projectPhotos[projectId] || Array(6).fill(projects.find(p => p.id === projectId)?.cover);
  };

  return (
    <div className="min-h-screen bg-white">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 
              className="text-2xl font-light tracking-wider cursor-pointer hover:opacity-60 transition-opacity"
              onClick={() => {
                setSelectedProject(null);
                scrollToSection('bio');
              }}
            >
              АЛИСА МЕЛИКОВА
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditMode(!editMode)}
              className="ml-auto mr-4"
            >
              <Icon name={editMode ? 'Check' : 'Edit'} size={18} />
              <span className="ml-2">{editMode ? 'Готово' : 'Редактировать'}</span>
            </Button>
            <div className="flex gap-12">
              <button
                onClick={() => scrollToSection('bio')}
                className={`text-sm tracking-wide transition-opacity ${activeSection === 'bio' ? 'opacity-100' : 'opacity-40'} hover:opacity-100`}
              >
                Биография
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className={`text-sm tracking-wide transition-opacity ${activeSection === 'portfolio' ? 'opacity-100' : 'opacity-40'} hover:opacity-100`}
              >
                Портфолио
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className={`text-sm tracking-wide transition-opacity ${activeSection === 'contacts' ? 'opacity-100' : 'opacity-40'} hover:opacity-100`}
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      {selectedProject && currentProject ? (
        <div className="pt-32 pb-24 animate-fade-in">
          <div className="max-w-6xl mx-auto px-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedProject(null)}
              className="mb-12 -ml-4"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="ml-2">Назад к портфолио</span>
            </Button>

            <h2 className="text-5xl font-light mb-8">{currentProject.title}</h2>
            <p className="text-lg text-gray-600 mb-16 max-w-3xl leading-relaxed">
              {currentProject.description}
            </p>

            <div className="grid grid-cols-2 gap-8">
              {getProjectPhotos(currentProject.id).map((photo, index) => (
                <div key={index} className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden relative group">
                  <img
                    src={photo}
                    alt={`${currentProject.title} - Фото ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {editMode && (
                    <button
                      onClick={() => triggerUpload('project', currentProject.id, index)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <div className="text-white text-center">
                        <Icon name="Upload" size={24} className="mx-auto mb-1" />
                        <span className="text-xs">Загрузить</span>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <section id="bio" className="pt-32 pb-24 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="animate-fade-in">
                  <h2 className="text-6xl font-light mb-8 leading-tight">
                    Алиса<br />Меликова
                  </h2>
                  <div className="w-20 h-px bg-gray-900 mb-8"></div>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    Российский художник, живущая и работающая в Москве.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Активно сотрудничает с ведущими режиссерами. Работы как в театральных постановках, 
                    так и в кинематографе.
                  </p>
                </div>
                <div className="animate-scale-in relative group">
                  <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden">
                    <img
                      src={bioPhoto}
                      alt="Алиса Меликова"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {editMode && (
                    <button
                      onClick={() => triggerUpload('bio')}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <div className="text-white text-center">
                        <Icon name="Upload" size={32} className="mx-auto mb-2" />
                        <span className="text-sm">Загрузить фото</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section id="portfolio" className="py-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-5xl font-light mb-4">Портфолио</h2>
              <div className="w-20 h-px bg-gray-900 mb-16"></div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <Card
                    key={project.id}
                    className="group cursor-pointer overflow-hidden border-0 shadow-none bg-white hover:shadow-xl transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => openProject(project.id)}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-2 group-hover:opacity-60 transition-opacity">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="contacts" className="py-24 min-h-screen flex items-center">
            <div className="max-w-3xl mx-auto px-6 w-full">
              <h2 className="text-5xl font-light mb-4">Контакты</h2>
              <div className="w-20 h-px bg-gray-900 mb-16"></div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm tracking-wide mb-3 text-gray-700">
                    Имя
                  </label>
                  <Input
                    className="border-gray-300 rounded-none h-12 focus:border-gray-900"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-wide mb-3 text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    className="border-gray-300 rounded-none h-12 focus:border-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-wide mb-3 text-gray-700">
                    Сообщение
                  </label>
                  <Textarea
                    className="border-gray-300 rounded-none min-h-[160px] focus:border-gray-900 resize-none"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gray-900 text-white px-12 py-6 rounded-none hover:bg-gray-700 transition-colors"
                >
                  Отправить
                </Button>
              </form>

              <div className="mt-16 pt-16 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  © 2024 Алиса Меликова. Все права защищены.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;