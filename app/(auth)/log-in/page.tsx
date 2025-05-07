'use client';
import FormButton from '@/components/ui/form/FormButton';
import FormInput from '@/components/ui/form/FormInput';
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
          <Terminal className="size-14 text-blue-600" />
          <h2 className="text-xl text-blue-600">Log In</h2>
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
          className="retro-button mt-4 flex justify-center border-gray-300 bg-gray-100 py-3 text-sm text-gray-800 hover:bg-gray-200"
        >
          회원가입
        </Link>
      </section>
    </main>
  );
}
