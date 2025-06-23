'use client';

import { updateResponse } from '@/app/(tabs)/tweets/[id]/actions';
import { TWEET_VALIDATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import FormButton from '../form/FormButton';

interface IResponseEditModeProps {
  id: number;
  initialContent: string;
  onCancelAction: () => void;
  onSuccessAction: (newContent: string) => void;
}

export default function ResponseEditMode({
  id,
  initialContent,
  onCancelAction,
  onSuccessAction,
}: IResponseEditModeProps) {
  const [content, setContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(updateResponse, {});

  const charCount = content.length;
  const isOverLimit = charCount > TWEET_VALIDATION.MAX_LENGTH;
  const isInvalid = charCount < TWEET_VALIDATION.MIN_LENGTH || isOverLimit;

  useEffect(() => {
    if (!state) return;

    if (state.formErrors?.length) {
      toast.error(state.formErrors[0]);
      return;
    }

    if (state.message) {
      toast.success(state.message);

      startTransition(() => {
        onSuccessAction(content);
      });
    }
  }, [state, content, onSuccessAction]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInvalid) return;

    const formData = new FormData();
    formData.append('content', content);
    formData.append('responseId', id.toString());

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="p-4">
      <div className="mb-2 flex justify-between">
        <span className="font-medium text-content-primary">댓글 수정</span>
        <div
          className={cn(
            'text-sm',
            isOverLimit ? 'text-status-error' : 'text-content-secondary'
          )}
        >
          {`${charCount}/${TWEET_VALIDATION.MAX_LENGTH}`}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="retro-input min-h-20 w-full p-3 text-base placeholder:text-content-secondary focus:border-brand-primary"
          rows={3}
          maxLength={TWEET_VALIDATION.MAX_LENGTH}
          disabled={isPending}
        />
        <small className="text-sm text-red-500">
          {state.fieldErrors?.content?.[0]}
        </small>
        <div className="mt-3 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancelAction}
            className={cn(
              'retro-button px-3 py-1 text-sm',
              'border-outline-primary bg-surface-tertiary',
              'hover:bg-interaction-secondary'
            )}
            disabled={isPending}
          >
            취소
          </button>
          <FormButton
            text="저장"
            loadingText="저장 중..."
            className={cn(
              'w-auto px-3 py-1 text-sm',
              'border-brand-primary bg-brand-primary',
              'text-special-button-on-accent hover:border-brand-primary hover:bg-brand-secondary'
            )}
            disabled={isInvalid}
          />
        </div>
      </form>
    </div>
  );
}
