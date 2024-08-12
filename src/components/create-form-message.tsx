import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateFormMessage() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Room ID is required')
  }

  async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if(!message || !roomId) {
      return
    }

    try {
      await createMessage({ roomId, message })
    } catch {
      toast.error('Ocorreu um erro ao criar a mensagem')
    }

  }

  return (
    <form 
      action={createMessageAction}
      className='flex items-center gap-2 bg-zinc-900 p-2  rounded-xl border border-zinc-800 focus-within:ring-1 ring-orange-400 ring-offset-2 ring-offset-zinc-950'
    >
      <input
        type='text'
        name='message'
        placeholder='Qual a sua pergunta?'
        className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
        autoComplete='off'
        required
      />
      
      <button type='submit' className='flex items-center bg-orange-400 hover:bg-orange-500 transition-colors text-orange-950 px-3 py-1.5 gap-1.5 rounded-lg font-medium text-sm'>
        <ArrowRight className='size-4' />
        Criar pergunta
      </button>
    </form>
  )
}