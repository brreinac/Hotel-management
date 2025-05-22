import useSWR from 'swr'
import { api } from '@/services/api'

export function useFetch<T>(url: string) {
  const { data, error, isLoading } = useSWR<T>(url, u => api.get(u).then(r => r.data))
  return { data, error, isLoading }
}
