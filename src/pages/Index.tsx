import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">EnglishFlow</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#courses"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Курсы
              </a>
              <a
                href="#practice"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Практика
              </a>
              <a
                href="#community"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Сообщество
              </a>
              <a
                href="#profile"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Профиль
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Вход
              </Button>
              <Button size="sm" className="gradient-bg border-0">
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 gradient-bg border-0 text-white">
                Платформа для изучения английского
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Изучай английский
                <span className="text-primary block">эффективно</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Персонализированное обучение с адаптивными курсами, голосовым
                помощником и геймификацией. От уровня A1 до C2.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gradient-bg border-0 hover-scale">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать обучение
                </Button>
                <Button variant="outline" size="lg" className="hover-scale">
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Выбрать уровень
                </Button>
              </div>
            </div>

            <div className="animate-slide-up">
              <img
                src="/img/2d783c51-de81-4e8f-bda8-a27b84319d43.jpg"
                alt="English Learning Platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4" id="courses">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Возможности платформы
            </h2>
            <p className="text-lg text-gray-600">
              Всё необходимое для эффективного изучения английского языка
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Target",
                title: "Адаптивные курсы",
                description:
                  "Персонализированное обучение с учётом вашего уровня и целей",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: "Mic",
                title: "Голосовая практика",
                description:
                  "ИИ-помощник для улучшения произношения в реальном времени",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: "Trophy",
                title: "Геймификация",
                description:
                  "Система достижений, бейджей и рейтингов для мотивации",
                color: "bg-yellow-50 text-yellow-600",
              },
              {
                icon: "Users",
                title: "Сообщество",
                description: "Общение с другими студентами и групповые задания",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: "BarChart3",
                title: "Аналитика",
                description: "Подробная статистика прогресса и рекомендации",
                color: "bg-red-50 text-red-600",
              },
              {
                icon: "Clock",
                title: "Гибкое расписание",
                description: "Занимайтесь в удобное время с напоминаниями",
                color: "bg-indigo-50 text-indigo-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover-scale transition-all duration-300 border-0 shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon name={feature.icon} size={24} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Уровни обучения
            </h2>
            <p className="text-lg text-gray-600">
              От начинающего до продвинутого уровня
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                level: "A1-A2",
                title: "Начинающий",
                description: "Основы грамматики и базовая лексика",
                progress: 85,
                color: "bg-green-500",
              },
              {
                level: "B1-B2",
                title: "Средний",
                description: "Разговорная практика и сложная грамматика",
                progress: 60,
                color: "bg-blue-500",
              },
              {
                level: "C1-C2",
                title: "Продвинутый",
                description: "Свободное владение и деловой английский",
                progress: 25,
                color: "bg-purple-500",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover-scale transition-all duration-300 border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm font-medium">
                      {item.level}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {item.progress}%
                    </span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {item.description}
                  </CardDescription>
                  <Progress value={item.progress} className="h-2" />
                  <Button
                    className="w-full mt-4 gradient-bg border-0"
                    variant="default"
                  >
                    Начать уровень
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4" id="practice">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Users", number: "15K+", label: "Активных студентов" },
              {
                icon: "BookOpen",
                number: "500+",
                label: "Интерактивных уроков",
              },
              { icon: "Award", number: "95%", label: "Успешных выпускников" },
              { icon: "Globe", number: "30+", label: "Стран" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover-scale transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={stat.icon} size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 bg-white/50" id="community">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Присоединяйтесь к сообществу
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Практикуйте язык с другими студентами, участвуйте в разговорных
            клубах и получайте поддержку от преподавателей
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: "MessageCircle",
                title: "Форумы",
                description: "Обсуждение уроков и вопросы",
              },
              {
                icon: "Video",
                title: "Разговорные клубы",
                description: "Живая практика с носителями",
              },
              {
                icon: "UserCheck",
                title: "Наставники",
                description: "Персональная помощь экспертов",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <Button size="lg" className="gradient-bg border-0 hover-scale">
            <Icon name="Users" size={20} className="mr-2" />
            Присоединиться к сообществу
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">EnglishFlow</h3>
              </div>
              <p className="text-gray-400">
                Эффективное изучение английского языка с ИИ-поддержкой
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Обучение</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Курсы
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Тесты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Практика
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Сообщество</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Форум
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Блог
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    События
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Помощь
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EnglishFlow. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
