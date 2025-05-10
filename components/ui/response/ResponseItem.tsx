'use client';

import { useState } from 'react';
import ResponseEditMode from './ResponseEditMode';
import ResponseViewMode from './ResponseViewMode';

interface IResponseItemProps {
  id: number;
  content: string;
  created_at: Date;
  username: string;
  isPending?: boolean;
  isOwner?: boolean;
  onUpdateSuccessAction?: (id: number, newContent: string) => void;
  onDeleteSuccessAction?: (id: number) => void;
}

export default function ResponseItem({
  id,
  content,
  created_at,
  username,
  isPending = false,
  isOwner = false,
  onUpdateSuccessAction,
  onDeleteSuccessAction,
}: IResponseItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditStartAction = () => {
    setIsEditing(true);
  };

  const handleEditCancelAction = () => {
    setIsEditing(false);
  };

  const handleEditSuccessAction = (newContent: string) => {
    if (!onUpdateSuccessAction) return;

    onUpdateSuccessAction(id, newContent);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ResponseEditMode
        id={id}
        initialContent={content}
        onCancelAction={handleEditCancelAction}
        onSuccessAction={handleEditSuccessAction}
      />
    );
  }

  return (
    <ResponseViewMode
      id={id}
      content={content}
      created_at={created_at}
      username={username}
      isPending={isPending}
      isOwner={isOwner}
      onEditClickAction={handleEditStartAction}
      onDeleteClickAction={onDeleteSuccessAction}
    />
  );
}
