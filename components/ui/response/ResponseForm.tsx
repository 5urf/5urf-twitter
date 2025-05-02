'use client';

import { addResponse } from '@/app/(tabs)/tweets/[id]/actions';
import FormButton from '@/components/ui/form/FormButton';
import { TWEET_VALIDATION } from '@/lib/constants';
import { useActionState, useState, useTransition } from 'react';

interface IResponseFormProps {
  tweetId: number;
  addResponseAction: (content: string) => void;
}

export default function ResponseForm({
  tweetId,
  addResponseAction,
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
    <div className="mt-6 rounded-lg border p-4">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="tweetId" value={tweetId} />
        <div className="mb-4">
          <textarea
            name="content"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            className="min-h-20 w-full rounded border border-gray-200 p-3 text-base outline-none placeholder:text-neutral-300 focus:border-blue-400"
            rows={3}
            placeholder="답글을 작성해주세요..."
            maxLength={TWEET_VALIDATION.MAX_LENGTH}
            minLength={TWEET_VALIDATION.MIN_LENGTH}
            disabled={isPending}
          />
          <div className="mt-2 text-sm text-red-500">
            {state.fieldErrors?.content || state.formErrors?.[0]}
          </div>
        </div>
        <FormButton
          text="답글 달기"
          loadingText="개시 중..."
          type="submit"
          disabled={invaild}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        />
      </form>
    </div>
  );
}
