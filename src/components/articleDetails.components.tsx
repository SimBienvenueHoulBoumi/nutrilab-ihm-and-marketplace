import Article from '@/interfaces/article.interface';
import React from 'react';

interface ArticleDetailsProps {
    selectedArticle: Article;
    closeModal: () => void;
    modalRef: React.RefObject<HTMLDivElement>;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ selectedArticle, closeModal, modalRef }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="relative bg-white rounded-lg p-6 w-3/4 max-w-2xl">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold m-2 p-2 bg-yellow-200">{selectedArticle.name}</h2>
                <div className="m-2 p-2">
                    <p><strong>Description:</strong> {selectedArticle.description}</p>
                    <p><strong>Area:</strong> {selectedArticle.area}</p>
                    <p>{new Date(selectedArticle.createdAt).toLocaleString()}</p>
                    <p>{new Date(selectedArticle.updatedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
