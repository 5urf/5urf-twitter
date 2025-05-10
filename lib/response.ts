import { isCurrentUser } from '@/lib/auth';
import db from '@/lib/db';

interface IValidationResultSuccess {
  success: true;
  response: { userId: number; tweetId: number };
}

interface IValidationResultError {
  success: false;
  error: string;
}

type ValidationResult = IValidationResultSuccess | IValidationResultError;

export async function validateResponseOwnership(
  responseId: number
): Promise<ValidationResult> {
  const response = await db.response.findUnique({
    where: { id: responseId },
    select: { userId: true, tweetId: true },
  });

  if (!response) {
    return {
      success: false,
      error: '댓글을 찾을 수 없습니다.',
    };
  }

  const isOwner = await isCurrentUser(response.userId);
  if (!isOwner) {
    return {
      success: false,
      error: '이 댓글에 대한 권한이 없습니다.',
    };
  }

  return {
    success: true,
    response,
  };
}
