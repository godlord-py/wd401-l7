import React from "react";
import HomePage from "./HomePage";
import LiveArticles from "./Article";

const HomePages: React.FC = () => {
    return (
        <div>
            <div className="w-full p-4 sm:pl-5 lg:pl-6 py-4 dark:bg-black">
                <HomePage />
            </div>
            <div className="w-full bg-slate-300 p-4 sm:pl-5 lg:pl-6 py-4 dark:bg-black">
                <LiveArticles />
            </div>
        </div>
    );
}


export default HomePages;