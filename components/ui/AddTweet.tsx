'use client';

import { addTweet } from '@/app/(tabs)/(home)/actions';
import FormButton from '@/components/ui/form/FormButton';
import { TWEET_VALIDATION } from '@/lib/constants';
import { startTransition, useActionState, useState } from 'react';

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
          className="retro-input min-h-20 w-full border-gray-300 bg-white p-3 text-base placeholder:text-gray-400 focus:border-blue-400"
          placeholder="무슨 일이 일어나고 있나요?"
          rows={3}
          maxLength={TWEET_VALIDATION.MAX_LENGTH}
          minLength={TWEET_VALIDATION.MIN_LENGTH}
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-red-500">{state.fieldErrors?.tweet}</div>
          <div
            className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}
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
            className="w-auto border-blue-500 bg-blue-500 px-4 py-2 hover:border-blue-600 hover:bg-blue-600 disabled:border-gray-300 disabled:bg-gray-300"
          />
        </div>
      </form>
    </div>
  );
}
