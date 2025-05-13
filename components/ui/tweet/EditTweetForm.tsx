'use client';

import { updateTweet } from '@/app/(tabs)/tweets/[id]/edit/actions';
import FormButton from '@/components/ui/form/FormButton';
import { TWEET_VALIDATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
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
          className="retro-input min-h-20 w-full p-3 text-base placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-primary)]"
          rows={5}
          maxLength={TWEET_VALIDATION.MAX_LENGTH}
          minLength={TWEET_VALIDATION.MIN_LENGTH}
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-red-500">{state.fieldErrors?.tweet}</div>
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
            text="수정하기"
            loadingText="수정 중..."
            type="submit"
            disabled={isInvalid}
            className="w-auto border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 py-2 text-[var(--button-text-on-accent)] hover:border-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)] disabled:border-[var(--border-secondary)] disabled:bg-[var(--border-secondary)]"
          />
        </div>
      </form>
    </div>
  );
}
