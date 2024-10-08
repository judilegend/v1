import React from "react";
import QuoteRequestForm from "../components/forms/QouteRequestForm";

const QuoteRequest: React.FC = () => {
  return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Request a Quote
            </h1>
          </div>
          <div className="p-6">
            <QuoteRequestForm />
          </div>
        </div>
      </div>
  );
};

export default QuoteRequest;
