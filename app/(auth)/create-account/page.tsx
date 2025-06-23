'use client';
import AuthPageHeader from '@/components/auth/AuthPageHeader';
import FormButton from '@/components/form/FormButton';
import FormInput from '@/components/form/FormInput';
import { ACCOUNT_VALIDATION } from '@/lib/constants';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { startTransition, useActionState } from 'react';
import { createAccount } from './actions';

export default function CreateAccountPage() {
  const [state, action] = useActionState(createAccount, {});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => action(formData));
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="retro-container w-full max-w-md">
        <AuthPageHeader icon={FileText} title="Create Account" />
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            icon="email"
            type="email"
            name="email"
            placeholder="Email"
            errorMessages={state?.fieldErrors?.email}
            required
          />
          <FormInput
            icon="username"
            type="text"
            name="username"
            placeholder="Username"
            minLength={ACCOUNT_VALIDATION.MIN_LENGTH.USERNAME}
            errorMessages={state.fieldErrors?.username}
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
          <FormInput
            icon="password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            errorMessages={state.fieldErrors?.confirmPassword}
            minLength={ACCOUNT_VALIDATION.MIN_LENGTH.PASSWORD}
            required
          />
          <FormButton text="계정 만들기" type="submit" />
        </form>
        <Link
          href="/log-in"
          className="mt-4 flex justify-center text-sm text-brand-primary transition hover:text-brand-secondary hover:underline"
        >
          계정이 이미 있으신가요? 로그인
        </Link>
      </section>
    </main>
  );
}
