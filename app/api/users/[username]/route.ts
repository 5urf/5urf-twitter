import { getSession } from '@/lib/session';
import { getUserByUsername } from '@/lib/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getSession();

    if (!session.id) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const username = decodeURIComponent(params.username);
    const user = await getUserByUsername(username);

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (user.id !== session.id) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      created_at: user.created_at,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
