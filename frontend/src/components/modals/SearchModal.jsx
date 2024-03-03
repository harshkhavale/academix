import React, { useState } from "react";

const SearchModal = ({ onClose }) => {
  const [classCode, setClassCode] = useState("");
  const handleJoinClassroom = () => {
    // Implement your logic to handle joining the classroom
    // You can use the classCode and navigate to the corresponding classroom

    console.log("Joining Classroom with Class Code:", classCode);

    onClose();
  };

  return (
    <div>
      <div>
        <div className="flex justify-center items-center fixed inset-0 bg-purple-300 bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-96 h-72 shadow p-4 relative">
            <button onClick={onClose} className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#7959FD"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div>
              <p className=" font-semibold text-2xl flex justify-center my-4">
                Join Classroom
              </p>
              <form className="flex-1 mt-10">
                <input
                  type="text"
                  placeholder="Class code"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  className="block w-full border border-black rounded-lg p-2 my-5 text-sm"
                />
              </form>
              <div className="flex justify-center">
                <button
                  onClick={handleJoinClassroom}
                  className="bg-primary text-white shadow-lg p-4 flex items-center gap-2 rounded-lg hover:bg-purple-400 my-4"
                >
                  Join Classroom
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
