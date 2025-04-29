'use client';
import FormButton from '@/components/ui/form/FormButton';
import FormInput from '@/components/ui/form/FormInput';
import { ACCOUNT_VALIDATION } from '@/lib/constants';
import { Smile } from 'lucide-react';
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
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-md rounded-lg p-8">
        <figure className="mb-8 flex flex-col items-center justify-center gap-2 *:font-medium">
          <Smile className="size-14 text-cyan-400" />
          <h2 className="text-xl">Fill in the form below to join!</h2>
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
          <FormButton text="Create account" type="submit" />
        </form>
      </section>
    </main>
  );
}
