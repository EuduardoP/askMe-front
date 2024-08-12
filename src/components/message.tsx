import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { createMessageReact } from "../http/create-message-react";
import { removeMessageReact } from "../http/remove-message-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface MessageProps {
  id: string
  text: string
  amountOfReacts: number
  answered?: boolean
}

export function Message({
  id: messageId, 
  text, 
  amountOfReacts, 
  answered = false
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false)

  const { roomId } = useParams()
  if (!roomId) {
    throw new Error('Room ID is required')
  }

  async function createMessageReactAction() {
    if (!roomId) {
      return
    }

    try {
      await createMessageReact({ roomId, messageId })
    } catch {
      toast ('Ocorreu um erro ao curtir a mensagem')
    }
    setHasReacted(true)
  }

  async function removeMessageReactAction() {
    if (!roomId) {
      return
    }

    try {
      await removeMessageReact({ roomId, messageId })
    } catch {
      toast ('Ocorreu um erro ao remover reação da mensagem')
    }

    setHasReacted(false)
  }

  return (
    <li data-answered={answered} className='pl-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none'>
            {text}

            {hasReacted ? (
                <button  
                  className='mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500'
                  onClick={removeMessageReactAction}
                >
                  <ArrowUp className='size-4' />
                  Curtir pergunta ({amountOfReacts})
               </button>
            ): (
              <button 
                onClick={createMessageReactAction}
                className='mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300'>
                <ArrowUp className='size-4' />
                Curtir pergunta ({amountOfReacts})
              </button>
          )}
            
            
          </li>
  )
}