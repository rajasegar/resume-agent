import { useForm, SubmitHandler } from 'react-hook-form';
import SmileyIcon from './assets/smiley.svg?react';
import SendIcon from './assets/send.svg?react';
import AttachmentIcon from './assets/attachment.svg?react';

type Inputs = {
  question: string
}


type PromptFormProps = {
  onSend: (data: Inputs) => void
}

export const PromptForm = ({onSend}: PromptFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    reset();
    onSend(data);
  }


  
  return (
    <>
    <div className="md:flex flex-row items-center h-16 rounded-xl bg-white w-full px-4" >
    <div>
    <button className="hidden md:visible md:flex items-center justify-center text-gray-400 hover:text-gray-600" >
    <AttachmentIcon/>
    </button>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="w-full md:flex mt-4">
    <div className="md:flex-grow ml-4">
    <div className="relative w-full">
    <input required
                                       type="text"
                                       className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 md:pl-4 h-10"
                                       {...register("question", { required: true })}
    />
    <button className="md:absolute md:flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600" >
    <SmileyIcon className="hidden"/>
    </button>
    </div>
    </div>
    <div className="md:ml-4">
    <button className="flex items-center justify-center bg-indigo-700 hover:bg-indigo-900 rounded-xl text-white px-4 py-1 flex-shrink-0"  type="submit" >
    <span>Send</span>
    <span className="ml-2">
    <SendIcon/>

    </span>
    </button>
    </div>
    </form>
    </div>
    </>
  );
}
