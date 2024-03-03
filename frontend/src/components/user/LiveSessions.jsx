import React from "react";
import { teacherbanner } from "../../assets";

const LiveSessions = () => {
  return (
    <div className="livesessions h-screen">
      <div
        id="toast-message-cta"
        class="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow :bg-gray-800 :text-gray-400"
        role="alert"
      >
        <div class="flex">
          <img
            class="w-8 h-8 rounded-full"
            src={teacherbanner}
            alt="Jese Leos image"
          />
          <div class="ms-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900 :text-white">
              Jese Leos
            </span>
            <div class="mb-2 text-sm font-normal">
              Hi Neil, Sheduled a Meeting at 9AM Today.
            </div>
            <a
              href="#"
              class="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 :bg-blue-500 :hover:bg-blue-600 :focus:ring-blue-800"
            >
              Notify me
            </a>
          </div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 :text-gray-500 :hover:text-white :bg-gray-800 :hover:bg-gray-700"
            data-dismiss-target="#toast-message-cta"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;
