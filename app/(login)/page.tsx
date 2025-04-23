'use client';
import FormButton from '@/components/ui/form/FormButton';
import FormInput from '@/components/ui/form/FormInput';
import { Smile } from 'lucide-react';
import { startTransition, useActionState } from 'react';
import { handleForm } from './actions';

export default function LoginPage() {
  const [state, action] = useActionState(handleForm, {});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => action(formData));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <section className="w-full max-w-md rounded-lg p-8">
        <figure className="mb-8 flex justify-center">
          <Smile className="size-14 text-cyan-400" />
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
            icon="username"
            type="text"
            name="username"
            placeholder="Username"
            minLength={5}
            errorMessages={state.fieldErrors?.username}
            required
          />
          <FormInput
            icon="password"
            type="password"
            name="password"
            placeholder="Password"
            minLength={10}
            errorMessages={state.fieldErrors?.password}
            required
          />
          <FormButton text="Log in" type="submit" />
        </form>
        {state.message && (
          <div className="mt-4 text-center text-sm text-green-500">
            {state.message}
          </div>
        )}
      </section>
    </main>
  );
}
