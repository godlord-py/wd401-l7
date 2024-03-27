import React, { Fragment, useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

interface PassProps {
  onClose: () => void; 
}

const Pass: React.FC<PassProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const token = localStorage.getItem('authToken');
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newPass.length < 8) {
        setError('New password must be at least 8 characters long');
        return;
      }
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current_password: currentPass, new_password: newPass }),
      });
      if (!response.ok) {
        throw new Error('Something went wrong while changing your password');
      }

      console.log('Password changed successfully');
      setcurrentPass('');
      setNewPass('');
      navigate('/signin');
    } catch (error) {
      setError(error.message);
      console.log('Password change failed:', error);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    onClose(); 
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleClose}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Reset your account password
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Enter your credentials</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
                  <div className="mb-4">
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                      Current password
                    </label>
                    <input
                      type="password"
                      id="current_password"
                      value={currentPass}
                      onChange={(e) => setcurrentPass(e.target.value)}
                      className="mt-1 p-2 border-black border-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <input
                      type="password"
                      id="new_password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="mt-1 p-2 border-black border-2 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
                {error && (
              <div className="mt-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              </div>
            )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Pass;
