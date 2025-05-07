import { cn } from '@/lib/utils';
import ResponseItem from './ResponseItem';

interface IResponseType {
  id: number;
  content: string;
  created_at: Date;
  user: {
    username: string;
  };
}

interface ResponseListProps {
  responses: IResponseType[];
}

export default function ResponseList({ responses }: ResponseListProps) {
  if (responses.length === 0) {
    return null;
  }

  return (
    <div className="retro-container overflow-hidden rounded-b-none p-0">
      {responses.map((response) => (
        <div
          key={response.id}
          className={cn(
            'border-b-2 border-gray-300 last:border-b-0',
            response.id < 0 && 'bg-blue-50'
          )}
        >
          <ResponseItem
            content={response.content}
            created_at={response.created_at}
            username={response.user.username}
            isPending={response.id < 0}
          />
        </div>
      ))}
    </div>
  );
}
