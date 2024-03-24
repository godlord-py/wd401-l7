import React, { Fragment, useEffect, useState } from "react";
import { Articles, ArticleDetails } from "../../types";
import { useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { API_ENDPOINT } from "../../config/constants";
//dark mode is not working
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
                        <div className="flex min-h-full items-center justify-center">
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-gray-300 text-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black dark:border border-red-400 border-2 bg-gradient-to-r from-blue-100 to-gray-300">
                                {articleDetails && (
                                    <>
                                        <Dialog.Title as="h3" className="text-2xl font-bold text-red-900 leading-6 text-black  dark:text-white">
                                            {articleDetails.title}
                                        </Dialog.Title>
                                        <p className="mb-4 mt-4 text-md text-black dark:text-neutral-400">{articleDetails.summary}</p>
                                        <div className="flex justify-between items-center mt-1 mb-3 gap-6">
                                            <p className="text-sm text-black dark:text-neutral-400">{articleDetails.sport.name}</p>
                                            <div className="flex items-center text-sm gap-1 text-black dark:text-white">
                                                <CalendarIcon className="w-4 h-4" />
                                                <p>
                                                    {articleDetails.date && new Date(articleDetails.date).toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 bg-gray-300 -m-6 p-6 text-black dark:bg-black bg-gradient-to-r from-blue-3 00 to-purple-300">
                                            <p className="font-bold text-lg mb-2 dark:text-white">About:</p>
                                            <div className="text-justify font-semibold dark:text-neutral-400">
                                                <p>{articleDetails.content}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
}

export default ArticleModal;
