'use client';

import { addResponse } from '@/app/(tabs)/tweets/[id]/actions';
import FormButton from '@/components/ui/form/FormButton';
import { TWEET_VALIDATION } from '@/lib/constants';
import { useActionState, useState, useTransition } from 'react';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (invaild) return;

    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      addResponseAction(responseText);

      action(formData);

      if (!state.fieldErrors && !state.formErrors) setResponseText('');
    });
  };

  return (
    <div
      className={`retro-container rounded-t-none ${hasResponses ? 'mt-2' : ''}`}
    >
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="tweetId" value={tweetId} />
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
          <div className="mt-2 text-sm text-red-500">
            {state.fieldErrors?.content || state.formErrors?.[0]}
          </div>
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
