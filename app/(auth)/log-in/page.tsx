'use client';
import AuthPageHeader from '@/components/auth/AuthPageHeader';
import FormButton from '@/components/form/FormButton';
import FormInput from '@/components/form/FormInput';
import { ACCOUNT_VALIDATION } from '@/lib/constants';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import { startTransition, useActionState } from 'react';
import { login } from './actions';

export default function LoginPage() {
  const [state, action] = useActionState(login, {});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => action(formData));
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="retro-container w-full max-w-md">
        <AuthPageHeader icon={Terminal} title="Log In" />
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            icon="email"
            type="email"
            name="email"
            placeholder="Email"
            errorMessages={state.fieldErrors?.email}
            required
          />
          <FormInput
            icon="password"
            type="password"
            name="password"
            placeholder="Password"
            minLength={ACCOUNT_VALIDATION.MIN_LENGTH.PASSWORD}
            errorMessages={state.fieldErrors?.password}
            required
          />
          <FormButton text="로그인" type="submit" />
        </form>
        <Link
          href="/create-account"
          className="retro-button mt-4 flex justify-center border-outline-primary bg-surface-tertiary py-3 text-sm text-content-primary hover:bg-interaction-secondary"
        >
          회원가입
        </Link>
      </section>
    </main>
  );
}
