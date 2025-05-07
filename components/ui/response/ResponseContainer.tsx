'use client';

import { useOptimistic } from 'react';
import ResponseForm from './ResponseForm';
import ResponseList from './ResponseList';

type ResponseType = {
  id: number;
  content: string;
  created_at: Date;
  user: {
    username: string;
  };
};

interface IResponseContainerProps {
  initialResponses: ResponseType[];
  tweetId: number;
  currentUsername: string;
}

export default function ResponseContainer({
  initialResponses,
  tweetId,
  currentUsername,
}: IResponseContainerProps) {
  const [optimisticResponses, addOptimisticResponse] = useOptimistic<
    ResponseType[],
    { content: string }
  >(initialResponses, (state, newResponse) => {
    return [
      {
        id: -Math.random(),
        content: newResponse.content,
        created_at: new Date(),
        user: {
          username: currentUsername,
        },
      },
      ...state,
    ];
  });

  const addResponseAction = (content: string) => {
    addOptimisticResponse({ content });
  };

  const hasResponses = optimisticResponses.length > 0;

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-base font-medium text-blue-600">
        댓글 {optimisticResponses.length}개
      </h3>
      {hasResponses && <ResponseList responses={optimisticResponses} />}
      <ResponseForm
        tweetId={tweetId}
        addResponseAction={addResponseAction}
        hasResponses={hasResponses}
      />
    </div>
  );
}
