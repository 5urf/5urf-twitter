'use client';
import FormButton from '@/components/form/FormButton';
import FormInput from '@/components/form/FormInput';
import { ACCOUNT_VALIDATION } from '@/lib/constants';
import { FileText } from 'lucide-react';
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
        <figure className="mb-8 flex flex-col items-center justify-center gap-2">
          <FileText className="size-14 text-[var(--text-primary)] dark:text-[var(--accent-primary)]" />
          <h2 className="text-xl text-[var(--text-primary)] dark:text-[var(--accent-primary)]">
            Create Account
          </h2>
        </figure>
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
      </section>
    </main>
  );
}
