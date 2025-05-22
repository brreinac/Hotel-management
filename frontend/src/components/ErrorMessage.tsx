export default function ErrorMessage({ message }: { message: string }) {
  return <p className="p-4 text-red-600">{message}</p>
}
