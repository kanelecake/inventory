export type InfiniteScrollSide = 'start' | 'end' | 'both'
export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error'

export type InfiniteScrollDoneFn = (status: InfiniteScrollStatus) => void;