export type ResponseType<D = {}> = {
  data: D
  fieldsErrors: Array<string>
  messages: Array<string>
  resultCode: number
}
