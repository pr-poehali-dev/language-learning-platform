import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface CourseDashboardProps {
  userLevel: string;
  onStartLesson: (lessonId: string) => void;
}

const courses = {
  A1: [
    {
      id: "a1-basics",
      title: "Основы английского",
      description: "Алфавит, произношение, базовые фразы",
      lessons: 12,
      completed: 8,
      duration: "2 недели",
      difficulty: "Легко",
      topics: ["Алфавит", "Произношение", "Приветствие", "Числа"],
    },
    {
      id: "a1-grammar",
      title: "Базовая грамматика",
      description: "Present Simple, артикли, местоимения",
      lessons: 15,
      completed: 3,
      duration: "3 недели",
      difficulty: "Легко",
      topics: ["Present Simple", "Артикли", "Местоимения", "Вопросы"],
    },
  ],
  B1: [
    {
      id: "b1-conversations",
      title: "Разговорная практика",
      description: "Диалоги на повседневные темы",
      lessons: 20,
      completed: 12,
      duration: "4 недели",
      difficulty: "Средне",
      topics: ["Работа", "Хобби", "Путешествия", "Еда"],
    },
    {
      id: "b1-business",
      title: "Деловой английский",
      description: "Общение в профессиональной среде",
      lessons: 18,
      completed: 0,
      duration: "5 недель",
      difficulty: "Средне",
      topics: ["Презентации", "Переговоры", "Email", "Встречи"],
    },
  ],
};

const practiceActivities = [
  {
    id: "speaking",
    title: "Разговорная практика",
    description: "ИИ-помощник для улучшения произношения",
    icon: "Mic",
    color: "bg-green-50 text-green-600",
    available: true,
  },
  {
    id: "listening",
    title: "Аудирование",
    description: "Понимание речи на слух",
    icon: "Headphones",
    color: "bg-blue-50 text-blue-600",
    available: true,
  },
  {
    id: "writing",
    title: "Письменная практика",
    description: "Сочинения и эссе с проверкой",
    icon: "PenTool",
    color: "bg-purple-50 text-purple-600",
    available: true,
  },
  {
    id: "grammar",
    title: "Грамматические тесты",
    description: "Закрепление правил грамматики",
    icon: "BookOpen",
    color: "bg-orange-50 text-orange-600",
    available: true,
  },
];

const CourseDashboard = ({
  userLevel = "A1",
  onStartLesson,
}: CourseDashboardProps) => {
  const [activeTab, setActiveTab] = useState("courses");
  const userCourses = courses[userLevel as keyof typeof courses] || courses.A1;

  const handleStartCourse = (courseId: string) => {
    onStartLesson(courseId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Панель обучения</h1>
          <p className="text-gray-600">
            Ваш уровень: {userLevel} • Продолжайте изучение!
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon name="Target" size={16} className="mr-2" />
            Поставить цель
          </Button>
          <Button className="gradient-bg border-0">
            <Icon name="Zap" size={16} className="mr-2" />
            Быстрый урок
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="text-sm text-gray-600">Уроков завершено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-sm text-gray-600">Дней подряд</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-600">Часов обучения</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">Точность ответов</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Курсы</TabsTrigger>
          <TabsTrigger value="practice">Практика</TabsTrigger>
          <TabsTrigger value="community">Сообщество</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Курсы для уровня {userLevel}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {userCourses.map((course) => {
                const progressPercentage = Math.round(
                  (course.completed / course.lessons) * 100,
                );

                return (
                  <Card
                    key={course.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            {course.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{course.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс</span>
                          <span>
                            {course.completed}/{course.lessons} уроков
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {course.topics.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.topics.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="BookOpen" size={14} />
                            {course.lessons} уроков
                          </span>
                        </div>
                        <Button
                          onClick={() => handleStartCourse(course.id)}
                          className="gradient-bg border-0"
                        >
                          {course.completed > 0 ? "Продолжить" : "Начать"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recommended Next */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Lightbulb" size={20} />
                Рекомендуем изучить дальше
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Переходите на уровень A2
                  </h3>
                  <p className="text-gray-600">
                    Вы почти завершили уровень A1. Готовы к новым вызовам?
                  </p>
                </div>
                <Button className="gradient-bg border-0">Пройти тест</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Практические упражнения
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {practiceActivities.map((activity) => (
                <Card
                  key={activity.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                  onClick={() => onStartLesson(activity.id)}
                >
                  <CardContent className="pt-6 text-center">
                    <div
                      className={`w-16 h-16 ${activity.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon name={activity.icon} size={28} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {activity.description}
                    </p>
                    <Button
                      className="w-full gradient-bg border-0"
                      disabled={!activity.available}
                    >
                      {activity.available ? "Начать" : "Скоро"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Daily Challenge */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Zap" size={20} />
                Ежедневный вызов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Выучите 10 новых слов
                  </h3>
                  <p className="text-gray-600">
                    Ежедневное изучение лексики поможет быстрее прогрессировать
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={60} className="w-32 h-2" />
                    <span className="text-sm text-gray-600">6/10 слов</span>
                  </div>
                </div>
                <Button className="gradient-bg border-0">Продолжить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Сообщество
            </h2>

            {/* Speaking Clubs */}
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Разговорные клубы
                </CardTitle>
                <CardDescription>
                  Практикуйте английский с другими студентами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Beginner Speaking Club",
                      time: "18:00",
                      participants: 8,
                      level: "A1-A2",
                    },
                    {
                      title: "Travel Conversations",
                      time: "19:30",
                      participants: 12,
                      level: "B1-B2",
                    },
                    {
                      title: "Business English Club",
                      time: "20:00",
                      participants: 6,
                      level: "B2-C1",
                    },
                  ].map((club, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {club.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {club.time} • {club.participants} участников • Уровень{" "}
                          {club.level}
                        </p>
                      </div>
                      <Button variant="outline">Присоединиться</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forum */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={20} />
                  Форум сообщества
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Как улучшить произношение?",
                      author: "Анна К.",
                      replies: 15,
                      time: "2 часа назад",
                    },
                    {
                      title: "Лучшие приложения для изучения",
                      author: "Михаил С.",
                      replies: 8,
                      time: "5 часов назад",
                    },
                    {
                      title: "Подготовка к IELTS",
                      author: "Елена П.",
                      replies: 23,
                      time: "1 день назад",
                    },
                  ].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 cursor-pointer"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {topic.author} • {topic.replies} ответов •{" "}
                          {topic.time}
                        </p>
                      </div>
                      <Icon
                        name="ChevronRight"
                        size={20}
                        className="text-gray-400"
                      />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 gradient-bg border-0">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать новую тему
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDashboard;
