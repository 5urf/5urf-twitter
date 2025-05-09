export type FormActionState = {
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
  message?: string;
  data?: {
    tweetId?: number;
  };
};
