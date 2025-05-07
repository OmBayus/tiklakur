'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
        <CardDescription>
          Yeni bir hesap oluşturmak için bilgilerinizi girin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ad Soyad</Label>
          <Input id="name" placeholder="Ad Soyad" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">E-posta</Label>
          <Input id="signup-email" type="email" placeholder="ornek@email.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Şifre</Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
              </span>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password ">Şifre Tekrar</Label>
          <Input id="confirm-password" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full cursor-pointer">Kayıt Ol</Button>
      </CardFooter>
    </Card>
  );
}
