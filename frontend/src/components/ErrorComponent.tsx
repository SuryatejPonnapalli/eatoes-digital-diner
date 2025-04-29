import React from "react";
import { Link } from "react-router";

interface ErrorComponentProps {
  message: string;
  redirectUrl: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  redirectUrl,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-xs w-full">
        <h3 className="text-xl font-semibold text-red-600">Error</h3>
        <p className="text-sm text-gray-700 mt-2">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Link
            to={redirectUrl}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            OK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
