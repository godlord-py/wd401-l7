import React, { Fragment, useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

const Pass: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const token = localStorage.getItem('authToken');
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: 'POST',
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
      console.log('Password change failed:', error);
    }
  };

  function closeModal() {
    setIsOpen(false);
    navigate('../../');
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-green-700 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold leading-6 text-white mb-2"
                  >
                    Reset your account password
                  </Dialog.Title>
                  <p className="mb-4 text-sm">Enter your credentials.</p>
                  <div className="mt-4 bg-white -m-6 p-6 text-black">
                    <form
                      onSubmit={handleSubmit}
                      className="w-full bg-white px-6 flex flex-col items-start justify-center"
                    >
                      <div className="mb-3">
                        <span className="text-red-500">{/* Display resetError here */}</span>
                      </div>
                      <div className="mb-6 w-full">
                        <label
                          htmlFor="current_password"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          Current password
                        </label>
                        <input
                          type="password"
                          id="current_password"
                          value={currentPass}
                          onChange={(e) => setcurrentPass(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        />
                      </div>
                      <div className="mb-6 w-full">
                        <label
                          htmlFor="new_password"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          New password
                        </label>
                        <input
                          type="password"
                          id="new_password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full md:w-fit bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Reset Password
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Pass;
