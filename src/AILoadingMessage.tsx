const AILoadingMessage = () => {
   return (
      <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
      > A </div>
      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
      <div className="flex">
<svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>Processing...</div>
      </div>
      </div>
      </div>
   )  
}

export default AILoadingMessage;
