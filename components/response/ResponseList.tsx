import { cn } from '@/lib/utils';
import { ResponseType } from '@/types/response';
import ResponseItem from './ResponseItem';

interface IResponseListProps {
  responses: ResponseType[];
  currentUserId: number;
  onUpdateSuccessAction?: (id: number, content: string) => void;
  onDeleteSuccessAction?: (id: number) => void;
}

export default function ResponseList({
  responses,
  currentUserId,
  onUpdateSuccessAction,
  onDeleteSuccessAction,
}: IResponseListProps) {
  if (responses.length === 0) {
    return null;
  }

  return (
    <div className="retro-container overflow-hidden rounded-b-none p-0">
      {responses.map((response) => (
        <div
          key={response.id}
          className={cn(
            'border-b-2 border-brand-primary last:border-b-0',
            response.id < 0 && 'bg-brand-light'
          )}
        >
          <ResponseItem
            id={response.id}
            content={response.content}
            created_at={response.created_at}
            username={response.user.username}
            isPending={response.id < 0}
            isOwner={response.user.id === currentUserId}
            onUpdateSuccessAction={onUpdateSuccessAction}
            onDeleteSuccessAction={onDeleteSuccessAction}
          />
        </div>
      ))}
    </div>
  );
}
