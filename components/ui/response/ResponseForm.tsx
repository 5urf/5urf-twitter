'use client';

import { addResponse } from '@/app/(tabs)/tweets/[id]/actions';
import FormButton from '@/components/ui/form/FormButton';
import { TWEET_VALIDATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface IResponseFormProps {
  tweetId: number;
  addResponseAction: (content: string) => void;
  hasResponses?: boolean;
}

export default function ResponseForm({
  tweetId,
  addResponseAction,
  hasResponses = false,
}: IResponseFormProps) {
  const [responseText, setResponseText] = useState('');
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(addResponse, {});

  const charCount = responseText.length;
  const invaild =
    charCount < TWEET_VALIDATION.MIN_LENGTH ||
    charCount > TWEET_VALIDATION.MAX_LENGTH;

  useEffect(() => {
    if (!state) return;

    if (state.formErrors?.length) {
      toast.error(state.formErrors[0]);
      return;
    }

    if (state.message) {
      toast.success(state.message);
      setResponseText('');
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (invaild) return;

    const formData = new FormData();
    formData.append('content', responseText);
    formData.append('tweetId', tweetId.toString());

    startTransition(() => {
      action(formData);

      if (!state.fieldErrors && !state.formErrors) {
        addResponseAction(responseText);
      }
    });
  };

  return (
    <div
      className={cn('retro-container rounded-t-none', hasResponses && 'mt-2')}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            name="content"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            className="retro-input min-h-20 w-full border-gray-300 bg-white p-3 text-base placeholder:text-gray-400 focus:border-blue-400"
            rows={3}
            placeholder="댓글을 작성해주세요."
            maxLength={TWEET_VALIDATION.MAX_LENGTH}
            minLength={TWEET_VALIDATION.MIN_LENGTH}
            disabled={isPending}
          />
          <small className="mt-2 text-sm text-red-500">
            {state.fieldErrors?.content}
          </small>
          <div className="mt-2 flex justify-end">
            <div className="text-sm text-gray-500">
              {responseText.length}/{TWEET_VALIDATION.MAX_LENGTH}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <FormButton
            text="댓글 달기"
            loadingText="게시 중..."
            type="submit"
            disabled={invaild}
            className="w-auto border-blue-500 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
}
