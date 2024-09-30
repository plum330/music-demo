type Result = {
  code: number
}

export interface ResultData<T = any> extends Result {
  result?: T
}

