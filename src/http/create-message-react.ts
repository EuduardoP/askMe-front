interface CreateMessageReactRequest {
  roomId: string
  messageId: string
}

export async function createMessageReact({ roomId, messageId }: CreateMessageReactRequest) {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/react`, {
    method: 'PATCH',
  })
}