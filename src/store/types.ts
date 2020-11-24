export interface IState {
  jokes: TJokes
}

export type TJokes = Array<TJoke>;

export type TJoke = {
  value: string,
  id: number
}
