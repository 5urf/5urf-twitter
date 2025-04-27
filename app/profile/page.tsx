import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { Smile } from 'lucide-react';
import { redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) return user;
  }
  redirect('/log-in');
}

export default async function ProfilePage() {
  const { username, email } = await getUser();
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-md rounded-lg p-8">
        <figure className="mb-8 flex flex-col items-center justify-center gap-2 *:font-medium">
          <Smile className="size-14 text-cyan-400" />
          <h2 className="text-xl">Profile</h2>
        </figure>
        <div className="space-y-4 *:text-lg">
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <form action={logOut}>
            <button className="primary-btn rounded-md">Log out</button>
          </form>
        </div>
      </section>
    </main>
  );
}
