import { ArrowRight } from 'lucide-react';
import amaLogo from '../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../http/create-room';
import { toast } from 'sonner';


export function CreateRoomPage() {
  const navigate = useNavigate();

  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      return
    }

    try {
      const { roomId } = await createRoom({ theme })
      navigate(`/room/${roomId}`)
    }

    catch {
      toast.error('Ocorreu um erro ao criar a sala')
    }
  }

  return (
    <main className='flex flex-col items-center justify-center h-screen px-4'>
      <div className='flex flex-col gap-6 max-w=[450px]'>
        <img src={amaLogo} alt="AMA Logo" className='h-10'/>

        <p className='leading-relaxed text-center text-zinc-300'>
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>

        <form 
          action={handleCreateRoom}
          className='flex items-center gap-2 bg-zinc-900 p-2  rounded-xl border border-zinc-800 focus-within:ring-1 ring-orange-400 ring-offset-2 ring-offset-zinc-950'
        >
          <input
            type='text'
            name='theme'
            placeholder='Nome da sala'
            className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
            autoComplete='off'
            required
          />
          
          <button type='submit' className='flex items-center bg-orange-400 hover:bg-orange-500 transition-colors text-orange-950 px-3 py-1.5 gap-1.5 rounded-lg font-medium text-sm'>
            <ArrowRight className='size-4' />
            Criar sala
          </button>
        </form>
      </div>
    </main>
  );
}