export type ResponseType<D = {}> = {
  data: D
  fieldsErrors: FieldErrorType[]
  messages: Array<string>
  resultCode: number
}
export type FieldErrorType = {
  error: string
  field: string
}
