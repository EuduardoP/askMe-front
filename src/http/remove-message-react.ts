interface RemoveMessageReactRequest {
  roomId: string
  messageId: string
}

export async function removeMessageReact({ roomId, messageId }: RemoveMessageReactRequest) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'DELETE',
  })
}