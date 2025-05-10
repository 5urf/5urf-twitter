'use client';

import { updateResponse } from '@/app/(tabs)/tweets/[id]/actions';
import { TWEET_VALIDATION } from '@/lib/constants';
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
  }, [state]);

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
        <span className="font-medium">댓글 수정</span>
        <div
          className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}
        >
          {`${charCount}/${TWEET_VALIDATION.MAX_LENGTH}`}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="retro-input min-h-20 w-full border-gray-300 bg-white p-3 text-base placeholder:text-gray-400 focus:border-blue-400"
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
            className="retro-button border-gray-300 bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            disabled={isPending}
          >
            취소
          </button>
          <FormButton
            text="저장"
            loadingText="저장 중..."
            type="submit"
            disabled={isInvalid}
            className="w-auto border-blue-500 bg-blue-500 px-3 py-1 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
}
