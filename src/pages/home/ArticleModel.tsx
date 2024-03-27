import React, { Fragment, useEffect, useState } from "react";
import { Articles, ArticleDetails } from "../../types";
import { useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { API_ENDPOINT } from "../../config/constants";

const ArticleModal = ({ article, onClose }: { article: Articles | null; onClose: () => void; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [articleDetails, setArticleDetails] = useState<ArticleDetails | undefined>(undefined);

    useEffect(() => {
        setIsOpen(true);
        if (article) {
            searchArticle(article.id);
        }
    }, [article]);

    const searchArticle = (articleId: string) => {
        fetch(`${API_ENDPOINT}/articles/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                setArticleDetails(data);
            })
            .catch((error) => {
                console.error("Error fetching article details:", error);
            });
    };

    const closeModal = () => {
        setIsOpen(false);
        onClose();
        navigate('../../');
    };

    return (
                    <>
                    <motion.div 
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }} 
                animate={{ opacity: 1, scale: 1, filter: "blur(70px)" }} 
                exit={{ opacity: 0, scale: 0.95, filter: "blur(100px)" }} 
                className="flex min-h-full items-center justify-center"
            >
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
    
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex min-h-full items-center justify-center">
                        <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-gray-200 text-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <button className="absolute top-2 right-2" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                                {articleDetails && (
                                    <>
                                        <Dialog.Title as="h3" className="text-2xl font-bold text-red-900 leading-6 mb-10">
                                            {articleDetails.title}
                                        </Dialog.Title>
                                        <img src={articleDetails.thumbnail} alt={articleDetails.title} className="w-full h-72 object-cover mb-4 rounded-lg shadow" />
                                        <p className="text-base text-gray-700 mb-4">{articleDetails.summary}</p>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-sm text-gray-700">{articleDetails.sport.name}</p>
                                            <div className="flex items-center text-md gap-1 text-gray-900">
                                                <CalendarIcon className="w-4 h-4" />
                                                <p>
                                                    {articleDetails.date && new Date(articleDetails.date).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-300 p-4 text-black rounded-lg">
                                            <p className="font-bold text-xl mb-2">About:</p>
                                            <div className="text-base p-2">
                                                <p>{articleDetails.content}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Dialog.Panel>
                        </motion.div>
                    </Transition.Child>
                </Dialog>
            </Transition>
            </motion.div>
        </>
    );
}

export default ArticleModal;
