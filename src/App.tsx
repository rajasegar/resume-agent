import { useState } from 'react'
import { PromptForm } from './PromptForm';
import AILoadingMessage from './AILoadingMessage';
import { AIMessage, HumanMessage } from './Message';
import profile from './profile.json';



type Inputs = {
  question: string
}


type SkillButtonProps = {
  name: string;
  url:string;
}

const SocialButton = ({name, url}: SkillButtonProps) => {
  const initial = name[0].toUpperCase();
  return (
    <a target="_blank" href={url} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" >
      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" >
      {initial}
      </div>
      <div className="ml-2 text-sm font-semibold">{name}</div>
      </a>
  );
}

  const initialMessages = [
    {
      type: "system",
      message: "Hey, how are you doing?"
    },
  ]

type IQuery = {
  inputs: {
    question: string,
    context : string
  }
}

function App() {
  const [messages,setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = (prompt: Inputs) => {

    const newMessages = [...messages, { type: "user", message: prompt.question}];
    setMessages(newMessages);
    
    async function query(data:IQuery) {
	    const response = await fetch(
		    "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
		    {
			    headers: {
				    Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
				    "Content-Type": "application/json",
			    },
			    method: "POST",
			    body: JSON.stringify(data),
		    }
	    );
	    const result = await response.json();
	    return result;
    }

    setIsLoading(true);
    query({"inputs": {
	    "question": prompt.question,
	    "context": profile.bio, 
    }}).then((response) => {
	    console.log(JSON.stringify(response));
      setIsLoading(false);
      if(response.answer) {
          setMessages([...newMessages, { type: "system", message: response.answer}]);
      } else {
        console.log(response.error);
                  setMessages([...newMessages, { type: "system", message: "Some unknown error occurred."}]);
      }
        
    });
  }

  return (
   <>
      <main className="md:flex h-screen antialiased text-gray-800">
      <div  className="md:flex flex-row h-full w-full overflow-x-hidden">
      <section id="left-col" className="md:flex flex-col p-4 py-8 md:pl-6 md:pr-2 md:w-64 bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
      <div className="ml-2 font-bold text-2xl">AI Resume</div>
      </div>
      <div className="flex flex-col items-center bg-indigo-900 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg text-white"
      >
      <div className="h-20 w-20 rounded-full border overflow-hidden">
      <img
      src="/profile.jpg"
      alt="Avatar"
      className="h-full w-full"
      />
      </div>
      <div className="text-sm font-semibold mt-2">{profile.name}</div>
      <div className="text-xs text-gray-100">{profile.rolel}</div>
      <div className="flex flex-row items-center mt-3">
      <div
      className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
      >
      <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
      </div>
      <div className="leading-none ml-1 text-xs">Available for Hire</div>
      </div>
      </div>
      <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-between text-xs">
      <span className="font-bold">Social</span>
      <span
      className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
      ></span
      >
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
      {
        profile.social.map((s,idx) => <SocialButton key={idx} initial="L" name={s.name} url={s.url} />)
      }

      </div>
      <div className="flex flex-row items-center justify-between text-xs mt-6">
      <span className="font-bold">CV</span>
      <span
      className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
      ></span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2">
      <a href="/resume.pdf" download
      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
      >
      <div
      className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg>
      </div>
      <div className="ml-2 text-sm font-semibold">Download Resume</div>
      </a>
      </div>
      </div>
      </section>
      
      <section id="right-col"className="md:flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4" >
      <div className="flex flex-col overflow-x-auto mb-4">
      <div className="flex flex-col">
      <div className="md:grid md:grid-cols-12">
      {messages.map((m,idx) => m.type == 'system' ? <AIMessage key={idx} message={m.message}/> : <HumanMessage key={idx} message={m.message}/>
      )}
      { isLoading && <AILoadingMessage />}
      </div>
      </div>
      </div>
      </div>
      <PromptForm onSend={sendRequest}/>
      </section>
      </div>
      </main>
   
    </>
  )
}

export default App
