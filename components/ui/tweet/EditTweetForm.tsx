'use client';

import { updateTweet } from '@/app/(tabs)/tweets/[id]/edit/actions';
import FormButton from '@/components/ui/form/FormButton';
import { TWEET_VALIDATION } from '@/lib/constants';
import { Tweet } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface IEditTweetFormProps {
  tweet: Tweet & {
    user: {
      id: number;
      username: string;
    };
  };
}

export default function EditTweetForm({ tweet }: IEditTweetFormProps) {
  const router = useRouter();
  const [tweetText, setTweetText] = useState(tweet.tweet);
  const [state, action] = useActionState(updateTweet, {});

  const charCount = tweetText.length;
  const isOverLimit = charCount > TWEET_VALIDATION.MAX_LENGTH;
  const isInvalid = charCount < TWEET_VALIDATION.MIN_LENGTH || isOverLimit;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setTweetText(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInvalid) return;

    const formData = new FormData(e.currentTarget);

    formData.append('tweetId', tweet.id.toString());

    startTransition(() => {
      action(formData);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.formErrors?.length) {
      toast.error(state.formErrors[0]);
      return;
    }

    if (state.message) {
      toast.success(state.message);

      if (state.data?.tweetId) {
        router.push(`/tweets/${state.data.tweetId}`);
      }
    }
  }, [state, router]);

  return (
    <div className="retro-container">
      <form onSubmit={handleSubmit}>
        <textarea
          name="tweet"
          value={tweetText}
          onChange={handleTextChange}
          className="retro-input min-h-20 w-full border-gray-300 bg-white p-3 text-base placeholder:text-gray-400 focus:border-blue-400"
          rows={5}
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
            text="수정하기"
            loadingText="수정 중..."
            type="submit"
            disabled={isInvalid}
            className="w-auto border-blue-500 bg-blue-500 px-4 py-2 hover:border-blue-600 hover:bg-blue-600 disabled:border-gray-300 disabled:bg-gray-300"
          />
        </div>
      </form>
    </div>
  );
}
