'use client';

import { addTweet } from '@/app/(tabs)/(home)/actions';
import { TWEET_VALIDATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { startTransition, useActionState, useState } from 'react';
import FormButton from '../form/FormButton';

export default function AddTweet() {
  const [tweetText, setTweetText] = useState('');
  const [state, action] = useActionState(addTweet, {});

  const charCount = tweetText.length;
  const isOverLimit = charCount > TWEET_VALIDATION.MAX_LENGTH;
  const invaild = charCount < TWEET_VALIDATION.MIN_LENGTH || isOverLimit;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setTweetText(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (invaild) return;

    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
      setTweetText('');
    });
  };

  return (
    <div className="retro-container mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          name="tweet"
          value={tweetText}
          onChange={handleTextChange}
          className="retro-input min-h-20 w-full p-3 text-base placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-primary)]"
          placeholder="무슨 일이 일어나고 있나요?"
          rows={3}
          maxLength={TWEET_VALIDATION.MAX_LENGTH}
          minLength={TWEET_VALIDATION.MIN_LENGTH}
        />
        <div className="mt-2 flex items-center justify-between">
          <small className="text-sm text-[var(--error)]">
            {state.fieldErrors?.tweet}
          </small>
          <div
            className={cn(
              'text-sm',
              isOverLimit
                ? 'text-[var(--error)]'
                : 'text-[var(--text-secondary)]'
            )}
          >
            {`${charCount}/${TWEET_VALIDATION.MAX_LENGTH}`}
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <FormButton
            text="트윗하기"
            loadingText="게시 중..."
            type="submit"
            disabled={invaild}
            className="w-auto px-4 py-2 disabled:border-gray-300 disabled:bg-gray-300"
          />
        </div>
      </form>
    </div>
  );
}
