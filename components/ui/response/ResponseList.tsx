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
    return (
      <div className="rounded-lg border p-4 text-center">
        <p className="text-gray-500">아직 답글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">답글 {responses.length}개</h3>
      <div className="space-y-4">
        {responses.map((response) => (
          <ResponseItem
            key={response.id}
            content={response.content}
            created_at={response.created_at}
            username={response.user.username}
            isPending={response.id < 0}
          />
        ))}
      </div>
    </div>
  );
}
