import { useParams } from 'react-router-dom';
import amaLogo from '../assets/Logo.svg';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Messages } from '../components/messages';
import { Suspense } from 'react';
import { CreateFormMessage } from '../components/create-form-message';

export function RoomPage() {
  const { roomId } = useParams()

  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.share != undefined && navigator.canShare()) {
      navigator.share({ url })
  } else {
    navigator.clipboard.writeText(url)

    toast.info('Link copiado para a área de transferência')
  }
}

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <a href='/'>
          <img src={amaLogo} alt="AMA Logo" className='h-5'/>
        </a>
        <span className="text-sm  tet-zinc-500 truncate">
          Código da sala: <span className='text-zinc-300'>{roomId}</span>
        </span>

        <button 
          type='submit' 
          className='flex items-center ml-auto bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-300 px-3 py-1.5 gap-1.5 rounded-lg font-medium text-sm'
          onClick={handleShareRoom}
        >
          <Share2 className='size-4' />
          Compartilhar
        </button>

      </div>

      <div className='h-px w-full bg-zinc-900'/>

      <CreateFormMessage />

        <Suspense fallback={<div>Carregando...</div>}>
          <Messages />
        </Suspense>
      
    </div>
  );
}