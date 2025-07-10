import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Неверный формат email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Имя обязательно";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Имитация API запроса
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
        level: null,
        avatar: null,
        progress: {
          totalLessons: 0,
          completedLessons: 0,
          currentStreak: 0,
          totalHours: 0,
        },
        achievements: [],
        joinDate: new Date().toISOString(),
      };

      onAuthSuccess(userData);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: `User from ${provider}`,
        email: `user@${provider.toLowerCase()}.com`,
        level: null,
        avatar: null,
        progress: {
          totalLessons: 0,
          completedLessons: 0,
          currentStreak: 0,
          totalHours: 0,
        },
        achievements: [],
        joinDate: new Date().toISOString(),
      };

      onAuthSuccess(userData);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {isLogin ? "Вход в аккаунт" : "Создать аккаунт"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Auth Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => handleSocialAuth("Google")}
              disabled={isLoading}
            >
              <Icon name="Chrome" size={20} className="mr-3" />
              Продолжить с Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => handleSocialAuth("Facebook")}
              disabled={isLoading}
            >
              <Icon name="Facebook" size={20} className="mr-3" />
              Продолжить с Facebook
            </Button>

            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => handleSocialAuth("Apple")}
              disabled={isLoading}
            >
              <Icon name="Apple" size={20} className="mr-3" />
              Продолжить с Apple
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-gray-500">или</span>
            <Separator className="flex-1" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Введите ваше имя"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                placeholder="Введите ваш email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
                placeholder="Введите пароль"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  placeholder="Повторите пароль"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full gradient-bg border-0 h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              ) : null}
              {isLogin ? "Войти" : "Создать аккаунт"}
            </Button>
          </form>

          {isLogin && (
            <div className="text-center">
              <Button variant="link" className="text-sm text-primary">
                Забыли пароль?
              </Button>
            </div>
          )}

          <div className="text-center text-sm text-gray-600">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <Button
              variant="link"
              className="text-primary p-0 ml-1 h-auto"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
