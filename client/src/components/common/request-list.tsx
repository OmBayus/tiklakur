'use client';

import { useState } from 'react';
import type { SpecialRequestData } from './SpecialRequest';
import type { StatusOption } from './ApprovedRequest';

type RequestStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';

export type RequestWithStatus = SpecialRequestData & {
  id: string;
  status: RequestStatus;
  submittedAt: string;
  updatedAt: string;
  projectStatus?: StatusOption;
};

type RequestListProps = {
  requests: RequestWithStatus[];
  onStatusChange?: (id: string, status: RequestStatus) => void;
  className?: string;
};

export default function RequestList({
  requests,
  onStatusChange,
  className = '',
}: RequestListProps) {
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(
    null,
  );
  const [dropdowns, setDropdowns] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string) => {
    setExpandedRequestId(expandedRequestId === id ? null : id);
  };

  const toggleDropdown = (id: string) => {
    setDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStatusChange = (id: string, status: RequestStatus) => {
    if (onStatusChange) {
      onStatusChange(id, status);
    }
    toggleDropdown(id);
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="border border-gray-300 rounded-3xl overflow-hidden shadow-lg bg-white">
        <div className="bg-black text-white p-8">
          <h2 className="text-2xl font-bold">Incoming Special Requests</h2>
          <p className="text-gray-300 mt-2">
            Review and manage all incoming template requests from customers.
          </p>
        </div>

        <div className="p-6">
          {requests.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No Requests Yet</h3>
              <p className="text-gray-600">
                There are no incoming requests at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            request.status,
                          )}`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                        <span className="font-medium">{request.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {request.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <span className="text-sm text-gray-500">
                        {formatDate(request.submittedAt)}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(request.id)}
                          className="p-2 rounded-full hover:bg-gray-200"
                        >
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                        {dropdowns[request.id] && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              {request.status !== 'pending' && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(request.id, 'pending')
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Mark as Pending
                                </button>
                              )}
                              {request.status !== 'reviewing' && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(request.id, 'reviewing')
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Mark as Reviewing
                                </button>
                              )}
                              {request.status !== 'approved' && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(request.id, 'approved')
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Approve Request
                                </button>
                              )}
                              {request.status !== 'rejected' && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(request.id, 'rejected')
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Reject Request
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => toggleDetails(request.id)}
                        className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800"
                      >
                        {expandedRequestId === request.id
                          ? 'Hide Details'
                          : 'View Details'}
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            expandedRequestId === request.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {expandedRequestId === request.id && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">
                            Request Information
                          </h4>
                          <div className="space-y-2">
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Request Type:
                              </span>
                              <span className="text-sm">
                                {request.requestType}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Category:
                              </span>
                              <span className="text-sm">
                                {request.templateCategory}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Budget:
                              </span>
                              <span className="text-sm">{request.budget}</span>
                            </div>
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Timeline:
                              </span>
                              <span className="text-sm">
                                {request.timeline}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Contact Information
                          </h4>
                          <div className="space-y-2">
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Name:
                              </span>
                              <span className="text-sm">{request.name}</span>
                            </div>
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Email:
                              </span>
                              <span className="text-sm">{request.email}</span>
                            </div>
                            {request.company && (
                              <div className="flex">
                                <span className="text-sm text-gray-500 w-32">
                                  Company:
                                </span>
                                <span className="text-sm">
                                  {request.company}
                                </span>
                              </div>
                            )}
                            {request.phone && (
                              <div className="flex">
                                <span className="text-sm text-gray-500 w-32">
                                  Phone:
                                </span>
                                <span className="text-sm">{request.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Project Details</h4>
                        <p className="text-sm whitespace-pre-wrap">
                          {request.details}
                        </p>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Required Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {request.features.map((feature: string) => (
                            <span
                              key={feature}
                              className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            Design Preferences
                          </h4>
                          <div className="space-y-2">
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Style:
                              </span>
                              <span className="text-sm">
                                {request.designPreferences.style}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Color Scheme:
                              </span>
                              <span className="text-sm">
                                {request.designPreferences.colorScheme}
                              </span>
                            </div>
                            {request.designPreferences.references && (
                              <div>
                                <span className="text-sm text-gray-500 block">
                                  References:
                                </span>
                                <span className="text-sm block mt-1 whitespace-pre-wrap">
                                  {request.designPreferences.references}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Technical Requirements
                          </h4>
                          <div className="space-y-2">
                            <div className="flex">
                              <span className="text-sm text-gray-500 w-32">
                                Responsive:
                              </span>
                              <span className="text-sm">
                                {request.technicalRequirements.responsive
                                  ? 'Yes'
                                  : 'No'}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500 block">
                                Frameworks:
                              </span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {request.technicalRequirements.frameworks.map(
                                  (framework: string) => (
                                    <span
                                      key={framework}
                                      className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                                    >
                                      {framework}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                            {request.technicalRequirements.otherTech && (
                              <div>
                                <span className="text-sm text-gray-500 block">
                                  Other Requirements:
                                </span>
                                <span className="text-sm block mt-1 whitespace-pre-wrap">
                                  {request.technicalRequirements.otherTech}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
