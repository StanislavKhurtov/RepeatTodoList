export enum TaskStatuses {
  Completed = 2,
  Draft = 3,
  InProgress = 1,
  New = 0,
}

export enum TaskPriorities {
  Hi = 2,
  Later = 4,
  Low = 0,
  Middle = 1,
  Urgently = 3,
}

export const RESULT_CODE = {
  FAILED: 1,
  RECAPTCHA_FAILED: 2,
  SUCCEEDED: 0,
} as const
