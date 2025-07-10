import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface LevelSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLevelSelect: (level: string) => void;
}

const levels = [
  {
    id: "A1",
    title: "Начинающий (A1)",
    description: "Я изучаю английский с нуля или знаю только отдельные слова",
    features: [
      "Алфавит и базовые звуки",
      "Простые фразы приветствия",
      "Числа и цвета",
      "Основы грамматики",
    ],
    color: "bg-green-50 border-green-200",
    icon: "Seedling",
  },
  {
    id: "A2",
    title: "Элементарный (A2)",
    description: "Могу составить простые предложения и понимаю базовую речь",
    features: [
      "Простые диалоги",
      "Настоящее время",
      "Описание себя и семьи",
      "Покупки и путешествия",
    ],
    color: "bg-blue-50 border-blue-200",
    icon: "Sprout",
  },
  {
    id: "B1",
    title: "Средний (B1)",
    description: "Понимаю основные идеи в разговоре на знакомые темы",
    features: [
      "Времена глаголов",
      "Рассказы о событиях",
      "Выражение мнений",
      "Планы и мечты",
    ],
    color: "bg-yellow-50 border-yellow-200",
    icon: "TreePine",
  },
  {
    id: "B2",
    title: "Выше среднего (B2)",
    description: "Могу понимать сложные тексты и свободно общаться",
    features: [
      "Сложная грамматика",
      "Абстрактные темы",
      "Профессиональное общение",
      "Культурные различия",
    ],
    color: "bg-orange-50 border-orange-200",
    icon: "Trees",
  },
  {
    id: "C1",
    title: "Продвинутый (C1)",
    description: "Понимаю сложные длинные тексты и говорю спонтанно",
    features: [
      "Нюансы языка",
      "Академический английский",
      "Деловые переговоры",
      "Литературные тексты",
    ],
    color: "bg-purple-50 border-purple-200",
    icon: "Mountain",
  },
  {
    id: "C2",
    title: "Владение (C2)",
    description: "Практически владею языком как родным",
    features: [
      "Совершенное понимание",
      "Тонкие смысловые оттенки",
      "Профессиональный уровень",
      "Преподавание и перевод",
    ],
    color: "bg-indigo-50 border-indigo-200",
    icon: "Crown",
  },
];

const LevelSelectionModal = ({
  isOpen,
  onClose,
  onLevelSelect,
}: LevelSelectionModalProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [showTest, setShowTest] = useState(false);

  const handleConfirmLevel = () => {
    if (selectedLevel) {
      onLevelSelect(selectedLevel);
      onClose();
    }
  };

  const handleTakeTest = () => {
    setShowTest(true);
  };

  if (showTest) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Тест на определение уровня
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-8">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Brain" size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Пройдите быстрый тест
            </h3>
            <p className="text-gray-600 mb-6">
              Ответьте на 15 вопросов, и мы точно определим ваш уровень
              английского языка
            </p>
            <div className="space-y-3">
              <Button
                className="w-full gradient-bg border-0"
                onClick={() => {
                  // Имитация прохождения теста
                  setTimeout(() => {
                    const testResult =
                      levels[Math.floor(Math.random() * levels.length)].id;
                    onLevelSelect(testResult);
                    onClose();
                  }, 2000);
                }}
              >
                <Icon name="Play" size={20} className="mr-2" />
                Начать тест (15 мин)
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowTest(false)}
              >
                Вернуться к выбору уровня
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Выберите ваш уровень английского
          </DialogTitle>
          <p className="text-center text-gray-600">
            Это поможет нам подобрать идеальную программу обучения
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <Button variant="outline" onClick={handleTakeTest} className="mb-4">
              <Icon name="Brain" size={20} className="mr-2" />
              Пройти тест для точного определения уровня
            </Button>
            <p className="text-sm text-gray-500">
              или выберите уровень самостоятельно
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {levels.map((level) => (
              <Card
                key={level.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedLevel === level.id
                    ? "ring-2 ring-primary shadow-lg"
                    : level.color
                }`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                        <Icon
                          name={level.icon}
                          size={20}
                          className="text-white"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{level.title}</CardTitle>
                        <Badge variant="outline">{level.id}</Badge>
                      </div>
                    </div>
                    {selectedLevel === level.id && (
                      <Icon
                        name="CheckCircle"
                        size={24}
                        className="text-primary"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-3">
                    {level.description}
                  </CardDescription>
                  <div className="space-y-1">
                    {level.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Icon
                          name="Check"
                          size={16}
                          className="text-green-500"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Пропустить пока
            </Button>
            <Button
              className="flex-1 gradient-bg border-0"
              onClick={handleConfirmLevel}
              disabled={!selectedLevel}
            >
              Продолжить с уровнем {selectedLevel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelSelectionModal;
