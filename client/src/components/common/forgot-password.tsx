'use client';

import { useState } from 'react';
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

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Şifremi Unuttum</CardTitle>
        <CardDescription>
          Şifrenizi sıfırlamak için e-posta adresinizi girin
        </CardDescription>
      </CardHeader>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
            </Button>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="space-y-4 text-center">
          <p className="text-black">
            Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi.
            Lütfen e-postanızı kontrol edin.
          </p>
          <Button
            onClick={() => {
              setEmail('');
              setIsSubmitted(false);
            }}
            className="w-full cursor-pointer"
          >
            Farklı bir e-posta adresi dene
          </Button>
        </CardContent>
      )}
    </Card>
  );
} 