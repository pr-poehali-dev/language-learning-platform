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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    level: string;
    avatar?: string;
    progress: {
      totalLessons: number;
      completedLessons: number;
      currentStreak: number;
      totalHours: number;
    };
    achievements: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      earnedAt: string;
    }>;
    joinDate: string;
  };
  onEditProfile: () => void;
}

const UserProfile = ({ user, onEditProfile }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const progressPercentage =
    user.progress.totalLessons > 0
      ? Math.round(
          (user.progress.completedLessons / user.progress.totalLessons) * 100,
        )
      : 0;

  const defaultAchievements = [
    {
      id: "1",
      title: "Первые шаги",
      description: "Завершили первый урок",
      icon: "Star",
      earnedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Упорство",
      description: "7 дней подряд занятий",
      icon: "Flame",
      earnedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Знаток грамматики",
      description: "Прошли 10 уроков грамматики",
      icon: "BookOpen",
      earnedAt: new Date().toISOString(),
    },
  ];

  const recentLessons = [
    {
      id: "1",
      title: "Present Simple",
      type: "Грамматика",
      progress: 100,
      date: "2024-07-10",
    },
    {
      id: "2",
      title: "Family Vocabulary",
      type: "Лексика",
      progress: 75,
      date: "2024-07-09",
    },
    {
      id: "3",
      title: "Daily Conversations",
      type: "Разговорная практика",
      progress: 60,
      date: "2024-07-08",
    },
    {
      id: "4",
      title: "Pronunciation Practice",
      type: "Произношение",
      progress: 90,
      date: "2024-07-07",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl font-bold gradient-bg text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="gradient-bg border-0 text-white">
                    Уровень {user.level || "Не определен"}
                  </Badge>
                  <Badge variant="outline">
                    <Icon name="Calendar" size={14} className="mr-1" />С{" "}
                    {new Date(user.joinDate).toLocaleDateString("ru-RU")}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex-1" />

            <Button onClick={onEditProfile} className="gradient-bg border-0">
              <Icon name="Settings" size={16} className="mr-2" />
              Редактировать профиль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="BookOpen" size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {user.progress.completedLessons}
            </div>
            <div className="text-sm text-gray-600">Уроков завершено</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Flame" size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {user.progress.currentStreak}
            </div>
            <div className="text-sm text-gray-600">Дней подряд</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Clock" size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {user.progress.totalHours}
            </div>
            <div className="text-sm text-gray-600">Часов обучения</div>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="Trophy" size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {defaultAchievements.length}
            </div>
            <div className="text-sm text-gray-600">Достижений</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="achievements">Достижения</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Прогресс обучения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Общий прогресс</span>
                  <span className="text-sm text-gray-600">
                    {progressPercentage}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {user.progress.completedLessons}/
                    {user.progress.totalLessons || 100}
                  </div>
                  <div className="text-sm text-gray-600">Уроки</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {user.level || "A1"}
                  </div>
                  <div className="text-sm text-gray-600">Текущий уровень</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">B1</div>
                  <div className="text-sm text-gray-600">Цель</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Goals */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" size={20} />
                Текущие цели
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  goal: "Завершить 5 уроков на этой неделе",
                  progress: 60,
                  current: 3,
                  total: 5,
                },
                {
                  goal: "Заниматься 30 минут в день",
                  progress: 80,
                  current: 24,
                  total: 30,
                },
                {
                  goal: "Изучить 50 новых слов",
                  progress: 40,
                  current: 20,
                  total: 50,
                },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.goal}</span>
                    <span className="text-sm text-gray-600">
                      {item.current}/{item.total}
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Award" size={20} />
                Ваши достижения
              </CardTitle>
              <CardDescription>
                Награды за успехи в изучении английского языка
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {defaultAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                  >
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                      <Icon
                        name={achievement.icon}
                        size={24}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Получено{" "}
                        {new Date(achievement.earnedAt).toLocaleDateString(
                          "ru-RU",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="History" size={20} />
                История обучения
              </CardTitle>
              <CardDescription>
                Ваши последние уроки и активность
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon
                          name="BookOpen"
                          size={20}
                          className="text-primary"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-600">{lesson.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Progress
                          value={lesson.progress}
                          className="w-16 h-2"
                        />
                        <span className="text-sm font-medium">
                          {lesson.progress}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(lesson.date).toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
