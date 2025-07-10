import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Question {
  id: string;
  type:
    | "multiple-choice"
    | "fill-blank"
    | "listening"
    | "speaking"
    | "matching";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  audioUrl?: string;
}

interface LessonInterfaceProps {
  lessonId: string;
  lessonTitle: string;
  questions: Question[];
  onComplete: (score: number) => void;
  onExit: () => void;
}

const sampleQuestions: Question[] = [
  {
    id: "1",
    type: "multiple-choice",
    question: 'What is the correct form of the verb "to be" for "I"?',
    options: ["am", "is", "are", "be"],
    correctAnswer: "am",
    explanation: 'For the first person singular "I", we always use "am".',
  },
  {
    id: "2",
    type: "fill-blank",
    question: 'Complete the sentence: "She _____ a teacher."',
    correctAnswer: "is",
    explanation: 'For third person singular (she/he/it), we use "is".',
  },
  {
    id: "3",
    type: "multiple-choice",
    question: 'Which word means "семья" in English?',
    options: ["house", "family", "home", "people"],
    correctAnswer: "family",
    explanation: "Family means семья in Russian.",
  },
  {
    id: "4",
    type: "listening",
    question:
      "Listen to the audio and choose the correct answer: What did she say?",
    options: [
      "Hello, how are you?",
      "Hi, what are you doing?",
      "Hey, where are you?",
      "Hello, who are you?",
    ],
    correctAnswer: "Hello, how are you?",
    audioUrl: "/audio/sample.mp3",
  },
];

const LessonInterface = ({
  lessonId,
  lessonTitle,
  questions = sampleQuestions,
  onComplete,
  onExit,
}: LessonInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const checkAnswer = () => {
    const userAnswer = userAnswers[currentQuestion.id];
    const isCorrect = userAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
      onComplete(Math.round((score / questions.length) * 100));
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowExplanation(false);
    }
  };

  const renderQuestion = () => {
    const userAnswer = userAnswers[currentQuestion.id];

    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={userAnswer}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "fill-blank":
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestion.question}</p>
            <Input
              value={userAnswer || ""}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              placeholder="Введите ваш ответ..."
              className="text-lg h-12"
            />
          </div>
        );

      case "listening":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className="w-20 h-20 rounded-full"
                onClick={() => {
                  // Play audio logic here
                  console.log("Playing audio:", currentQuestion.audioUrl);
                }}
              >
                <Icon name="Play" size={32} />
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Нажмите для воспроизведения
              </p>
            </div>

            <RadioGroup
              value={userAnswer}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return <div>Неизвестный тип вопроса</div>;
    }
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-0 shadow-lg text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Trophy" size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Урок завершён!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Ваш результат: {score}/{questions.length} правильных ответов
            </p>
            <div className="mb-6">
              <Progress
                value={(score / questions.length) * 100}
                className="h-3"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={onExit}>
                Вернуться к курсам
              </Button>
              <Button className="gradient-bg border-0">Следующий урок</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onExit}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Выйти
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{lessonTitle}</h1>
            <p className="text-gray-600">
              Вопрос {currentQuestionIndex + 1} из {questions.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Icon name="Clock" size={14} />
            {formatTime(timeLeft)}
          </Badge>
          <Badge className="gradient-bg border-0 text-white">
            {Math.round(progress)}%
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {currentQuestion.question}
            </CardTitle>
            <Badge variant="secondary">
              {currentQuestion.type === "multiple-choice" && "Выбор ответа"}
              {currentQuestion.type === "fill-blank" && "Заполните пропуск"}
              {currentQuestion.type === "listening" && "Аудирование"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>{renderQuestion()}</CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && currentQuestion.explanation && (
        <Card className="border-0 shadow-lg mb-6 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Объяснение</h3>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Icon name="ChevronLeft" size={16} className="mr-2" />
          Назад
        </Button>

        <div className="flex gap-3">
          {!showExplanation ? (
            <Button
              onClick={checkAnswer}
              disabled={!userAnswers[currentQuestion.id]}
              className="gradient-bg border-0"
            >
              Проверить ответ
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="gradient-bg border-0">
              {currentQuestionIndex === questions.length - 1
                ? "Завершить урок"
                : "Далее"}
              <Icon name="ChevronRight" size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonInterface;
