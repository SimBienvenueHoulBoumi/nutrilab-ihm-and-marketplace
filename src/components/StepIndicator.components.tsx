// StepIndicator.tsx
import React from 'react';

interface StepIndicatorProps {
  step: number;
  confirmed: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, confirmed }) => {
  return (
    <div className="p-5">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          <div className={`flex items-center ${step >= 1 ? 'text-teal-600' : 'text-gray-500'} relative`}>
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 1 ? 'border-teal-600' : 'border-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark ">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${step >= 1 ? 'text-teal-600' : 'text-gray-500'}`}>Article</div>
          </div>
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 2 ? 'border-teal-600' : 'border-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-teal-600' : 'text-gray-500'} relative`}>
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 2 ? 'border-teal-600' : 'border-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus ">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${step >= 2 ? 'text-teal-600' : 'text-gray-500'}`}>Ingredients</div>
          </div>
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step >= 3 ? 'border-teal-600' : 'border-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 3 ? 'text-teal-600' : 'text-gray-500'} relative`}>
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${step >= 3 ? 'border-teal-600' : 'border-gray-300'}`}>
              {confirmed ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm4.146 6.146a.5.5 0 0 0-.707 0L9 12.293 6.854 10.146a.5.5 0 1 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l5-5a.5.5 0 0 0 0-.708z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-database ">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              )}
            </div>
            <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${step >= 3 ? 'text-teal-600' : 'text-gray-500'}`}>Confirm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
