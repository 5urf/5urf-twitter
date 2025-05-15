'use client';
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
        <figure className="mb-8 flex flex-col items-center justify-center gap-2">
          <Terminal className="size-14 text-[var(--text-primary)] dark:text-[var(--accent-primary)]" />
          <h2 className="text-xl text-[var(--text-primary)] dark:text-[var(--accent-primary)]">
            Log In
          </h2>
        </figure>
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
          className="retro-button mt-4 flex justify-center border-[var(--border-primary)] bg-[var(--bg-tertiary)] py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--hover-light)]"
        >
          회원가입
        </Link>
      </section>
    </main>
  );
}
