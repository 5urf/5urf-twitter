'use client';

import { cn } from '@/lib/utils';
import { PendingResponse } from '@/types/database';
import { useCallback, useOptimistic } from 'react';
import ResponseForm from './ResponseForm';
import ResponseList from './ResponseList';

interface IUpdateAction {
  type: 'update';
  id: number;
  content: string;
}

interface IAddAction {
  type: 'add';
  content: string;
}

interface IDeleteAction {
  type: 'delete';
  id: number;
}

type ResponseAction = IUpdateAction | IAddAction | IDeleteAction;

interface IResponseContainerProps {
  initialResponses: PendingResponse[];
  tweetId: number;
  currentUsername: string;
  currentUserId: number;
}

export default function ResponseContainer({
  initialResponses,
  tweetId,
  currentUsername,
  currentUserId,
}: IResponseContainerProps) {
  const [optimisticResponses, updateOptimisticResponses] = useOptimistic<
    PendingResponse[],
    ResponseAction
  >(initialResponses, (state, update) => {
    if (update.type === 'add') {
      const newItem: PendingResponse = {
        id: -Math.random(),
        content: update.content,
        created_at: new Date(),
        updated_at: new Date(),
        userId: currentUserId,
        tweetId,
        user: {
          id: currentUserId,
          username: currentUsername,
        },
        isPending: true,
      };

      return [...state, newItem];
    }

    if (update.type === 'update') {
      return state.map((response) =>
        response.id === update.id
          ? { ...response, content: update.content }
          : response
      );
    }

    if (update.type === 'delete') {
      return state.filter((response) => response.id !== update.id);
    }

    return state;
  });

  const addResponseAction = (content: string) => {
    updateOptimisticResponses({
      type: 'add',
      content,
    });
  };

  const updateResponseAction = useCallback(
    (id: number, content: string) => {
      updateOptimisticResponses({
        type: 'update',
        id,
        content,
      });
    },
    [updateOptimisticResponses]
  );

  const deleteResponseAction = (id: number) => {
    updateOptimisticResponses({
      type: 'delete',
      id,
    });
  };

  const hasResponses = optimisticResponses.length > 0;

  return (
    <div className="mt-6">
      <h3 className={cn('mb-4 text-base font-medium text-brand-primary')}>
        댓글 {optimisticResponses.length}개
      </h3>

      {hasResponses && (
        <ResponseList
          responses={optimisticResponses}
          currentUserId={currentUserId}
          onUpdateSuccessAction={updateResponseAction}
          onDeleteSuccessAction={deleteResponseAction}
        />
      )}

      <ResponseForm
        tweetId={tweetId}
        addResponseAction={addResponseAction}
        hasResponses={hasResponses}
      />
    </div>
  );
}
