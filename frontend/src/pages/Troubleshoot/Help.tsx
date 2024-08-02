import React, { useState } from "react";

const Help = () => {
  const [faqVisibility, setFaqVisibility] = useState<{ [key: number]: boolean }>({});
  const toggleVisibility = (index:number ) => {
    setFaqVisibility({
      ...faqVisibility,
      [index]: !faqVisibility[index]
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-6">
      <div className="w-full min-h-screen p-8 space-y-6 rounded-lg bg-white shadow-lg font-inter">
        <h2 className="text-left text-2xl font-bold text-gray-900">
          Help & Troubleshooting
        </h2>
        <br />
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 py-4">
              Frequently Asked Questions
            </h2>
            <div className="bg-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold cursor-pointer">
                  Q: What are AI Models ?
                </p>
                <button
                  onClick={() => toggleVisibility(1)}
                  className="focus:outline-none"
                >
                  {faqVisibility[1] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {faqVisibility[1] && (
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2">
                  A: AI Models are programs that analyze datasets to find patterns and make predictions. They are trained 
				  on large datasets to recognize patterns and make predictions and/or decisions without being explicitly programmed.
				  AI Models can be used for various task such as natural language processing, recommendations programs, and many other use cases.
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="bg-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold cursor-pointer">
                  Q: What is temperature within an AI Model ?
                </p>
                <button
                  onClick={() => toggleVisibility(2)}
                  className="focus:outline-none"
                >
                  {faqVisibility[2] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {faqVisibility[2] && (
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2">
                  A: Temperature within the context of an AI model, we are speaking to the hyperparameter 
				  used during the generation pahse of the model. It controls the diversity of the generated outputs.
				  Lower temperatures will give confident outputs, while higher temperatures will give more diverse and potentially less accurate outputs.
				  Adjusting this hyperparameter will influence the variance of the AI model's outputs.
                </p>
              )}
            </div>
          </div>
		  <div>
            <div className="bg-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold cursor-pointer">
                  Q: What are tokens within an AI Model ?
                </p>
                <button
                  onClick={() => toggleVisibility(3)}
                  className="focus:outline-none"
                >
                  {faqVisibility[3] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {faqVisibility[3] && (
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2">
                  A: AI model tokens are fundamentally the smallest unit into which text may be broken down for an AI 
				  model to process. These tokens can represent words, punctuation, or special characters.
				  Each token is assigned a number within the model that is used for training. Changing the token limit will restrict the length of the 
				  AI model's response. Adjusting the token limit may affect the completeness of the model's output. 
                </p>
              )}
            </div>
          </div>
		  <div>
            <div className="bg-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold cursor-pointer">
                  Q: What are differences between AI Models ?
                </p>
                <button
                  onClick={() => toggleVisibility(4)}
                  className="focus:outline-none"
                >
                  {faqVisibility[4] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {faqVisibility[4] && (
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2">
                  A: Some differences within AI models could include :<br></br>
				  <ul>
					<li className="ml-4">1. Architecture Enhancements : Techniques to enhance model efficiency, scalability, and performance.</li>
			      </ul>
				  <ul>
				  	<li className="ml-4">2. Training Data : Training Data range and diversity of dataset as input.</li>
				  </ul>
				  <ul>
				  	<li className="ml-4">3. Performance : Exhibit better performance in completing task and accuracy</li>
				  </ul>
				  <ul>
				  	<li className="ml-4">4. Parameter Tunning : Allowing for customization of the model for specific task.</li>
				  </ul>
                </p>
              )}
            </div>
          </div>
		  <div>
            <div className="bg-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold cursor-pointer">
                  Q: How to craft an effective prompt for best responses ?
                </p>
                <button
                  onClick={() => toggleVisibility(5)}
                  className="focus:outline-none"
                >
                  {faqVisibility[5] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {faqVisibility[5] && (
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2">
                  A: The prompt 
				  should be clear, concise and focused on the task. Effective prompts can help steer the conversation and bring relevance within the AI model's responses.
				  Providing context and examples may help AI model's understand and generate accurate responses. 
				  
                </p>
              )}
            </div>
          </div>
		  <div>
            <div className="bg-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold cursor-pointer">
                  Q: What are some limitations within AI models ?
                </p>
                <button
                  onClick={() => toggleVisibility(6)}
                  className="focus:outline-none"
                >
                  {faqVisibility[6] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {faqVisibility[6] && (
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2">
                  A: Limitations within an AI models could include :
				  <ul>
					<li className="ml-4">1. Handling complex/ambigious prompts </li>
			      </ul>
				  <ul>
					<li className="ml-4">2. Addressing bias </li>
			      </ul>
				  <ul>
					<li className="ml-4">3. Out of Topic Knowledge </li>
			      </ul>
				  
                </p>
              )}
            </div>
          </div>
		  <div>
            <div className="bg-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-bold cursor-pointer">
                  Q: How do AI models adapt to new data ?
                </p>
                <button
                  onClick={() => toggleVisibility(7)}
                  className="focus:outline-none"
                >
                  {faqVisibility[7] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {faqVisibility[7] && (
                <p className="text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-2">
                  A: AI models will adapt to new data through their continuous updates. Parameters will be updated based on incoming data which allows 
				  for AI models to leverage the knowledge learned to improve performance and increase their domain knowledge.
				  
                </p>
              )}
            </div>
          </div>
		  <br></br>
		  <p> For more information about the AI models please visit the link below :</p>
		  <p className="inline"> AI Models : <a href="https://platform.openai.com/docs/models" target="_blank" className="underline">AImodels.com</a></p>

        </div>
      </div>
    </div>
  );
};

export default Help;