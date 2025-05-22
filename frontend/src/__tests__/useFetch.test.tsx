import { renderHook } from '@testing-library/react'
import { useFetch } from '@/hooks/useFetch'
import useSWR from 'swr'
import { api } from '@/services/api'

jest.mock('swr')
jest.mock('@/services/api', () => ({ api: { get: jest.fn() } }))

describe('useFetch', () => {
  it('devuelve datos y estados correctamente', () => {
    const fakeData = [1, 2, 3]
    ;(useSWR as jest.Mock).mockReturnValue({
      data: fakeData, error: undefined, isLoading: false
    })
    const { result } = renderHook(() => useFetch<number[]>('/test'))
    expect(result.current.data).toBe(fakeData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })
})
