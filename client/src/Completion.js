import React from "react";

// components

export default function CardPageVisits() {
  return (
  
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
          
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 style={{color:"green"}} className="font-semibold text-base text-blueGray-700 ">
               congratulations !!
              </h3>
              <p>we have recieved your payment,kindly click on the button bellow to go back to home page </p>
            </div>
            <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
               
              >
                Go back home
              </button>
          </div>
        </div>
        </div>
        
  );
}
