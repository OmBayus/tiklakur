'use client';

import { useState } from 'react';
import type { UnifiedRequest } from './request-list';

export type StatusOption =
  | 'in-progress'
  | 'design-review'
  | 'development'
  | 'testing'
  | 'completed';

type ApprovedRequestsProps = {
  requests: UnifiedRequest[];
  onStatusUpdate?: (id: string, status: StatusOption) => void;
  className?: string;
};

export default function ApprovedRequests({
  requests,
  onStatusUpdate,
  className = '',
}: ApprovedRequestsProps) {
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(
    null,
  );
  const [statusDropdowns, setStatusDropdowns] = useState<
    Record<string, boolean>
  >({});

  const approvedRequests = requests.filter(
    (request) => request.status === 'approved',
  );

  const toggleDetails = (id: string) => {
    setExpandedRequestId(expandedRequestId === id ? null : id);
  };

  const toggleStatusDropdown = (id: string) => {
    setStatusDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStatusUpdate = (id: string, status: string) => {
    if (onStatusUpdate) {
      onStatusUpdate(id, status as StatusOption);
    }
    toggleStatusDropdown(id);
  };

  const getProgressPercentage = (status: string): number => {
    switch (status) {
      case 'in-progress':
        return 20;
      case 'design-review':
        return 40;
      case 'development':
        return 60;
      case 'testing':
        return 80;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'design-review':
        return 'Design Review';
      case 'development':
        return 'Development';
      case 'testing':
        return 'Testing';
      case 'completed':
        return 'Completed';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
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
          <h2 className="text-2xl font-bold">Approved Requests</h2>
          <p className="text-gray-300 mt-2">
            Track the progress of all approved template requests.
          </p>
        </div>

        <div className="p-6">
          {approvedRequests.length === 0 ? (
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No Approved Requests</h3>
              <p className="text-gray-600">
                There are no approved requests at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {approvedRequests.map((request) => {
                const projectStatus =
                  (request as { projectStatus?: StatusOption }).projectStatus ||
                  'in-progress';
                const progress = getProgressPercentage(projectStatus);

                return (
                  <div
                    key={request.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-lg">
                            {request.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {request.requestType} - {request.templateCategory}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            Approved on {formatDate(request.updatedAt)}
                          </span>
                          <button
                            onClick={() => toggleDetails(request.id)}
                            className="p-2 rounded-full hover:bg-gray-100"
                          >
                            <svg
                              className={`w-5 h-5 transition-transform duration-200 ${
                                expandedRequestId === request.id
                                  ? 'rotate-180'
                                  : ''
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

                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <div className="relative">
                            <button
                              onClick={() => toggleStatusDropdown(request.id)}
                              className="flex items-center gap-1 text-sm font-medium hover:text-purple-600"
                            >
                              {getStatusLabel(projectStatus)}
                              <svg
                                className="w-4 h-4"
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
                            {statusDropdowns[request.id] && (
                              <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                  {[
                                    'in-progress',
                                    'design-review',
                                    'development',
                                    'testing',
                                    'completed',
                                  ].map((status) => (
                                    <button
                                      key={status}
                                      onClick={() =>
                                        handleStatusUpdate(request.id, status)
                                      }
                                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                        projectStatus === status
                                          ? 'font-medium text-purple-600'
                                          : 'text-gray-700'
                                      }`}
                                    >
                                      {getStatusLabel(status)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {expandedRequestId === request.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-2">
                                Project Details
                              </h4>
                              <p className="text-sm whitespace-pre-wrap">
                                {request.details}
                              </p>

                              <h4 className="font-medium mt-4 mb-2">
                                Design Preferences
                              </h4>
                              <div className="space-y-2">
                                <div className="flex">
                                  <span className="text-sm text-gray-500 w-32">
                                    Style:
                                  </span>
                                  <span className="text-sm">
                                    {request?.designPreferences?.style}
                                  </span>
                                </div>
                                <div className="flex">
                                  <span className="text-sm text-gray-500 w-32">
                                    Color Scheme:
                                  </span>
                                  <span className="text-sm">
                                    {request?.designPreferences?.colorScheme}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">
                                Required Features
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {request?.features?.map((feature) => (
                                  <span
                                    key={feature}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>

                              <h4 className="font-medium mt-4 mb-2">
                                Technical Requirements
                              </h4>
                              <div className="space-y-2">
                                <div className="flex">
                                  <span className="text-sm text-gray-500 w-32">
                                    Responsive:
                                  </span>
                                  <span className="text-sm">
                                    {request?.technicalRequirements?.responsive
                                      ? 'Yes'
                                      : 'No'}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500 block">
                                    Frameworks:
                                  </span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {request?.technicalRequirements?.frameworks.map(
                                      (framework) => (
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
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="font-medium mb-2">
                              Project Timeline
                            </h4>
                            <div className="relative">
                              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                              <div className="space-y-6">
                                <div className="relative flex items-start">
                                  <div
                                    className={`absolute left-4 w-4 h-4 rounded-full -translate-x-1/2 ${
                                      progress >= 20
                                        ? 'bg-purple-600 ring-4 ring-purple-100'
                                        : 'bg-gray-300'
                                    }`}
                                  ></div>
                                  <div className="ml-8">
                                    <h5 className="font-medium">
                                      Project Started
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                      Initial project setup and planning
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div
                                    className={`absolute left-4 w-4 h-4 rounded-full -translate-x-1/2 ${
                                      progress >= 40
                                        ? 'bg-purple-600 ring-4 ring-purple-100'
                                        : 'bg-gray-300'
                                    }`}
                                  ></div>
                                  <div className="ml-8">
                                    <h5 className="font-medium">
                                      Design Review
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                      Design mockups and client feedback
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div
                                    className={`absolute left-4 w-4 h-4 rounded-full -translate-x-1/2 ${
                                      progress >= 60
                                        ? 'bg-purple-600 ring-4 ring-purple-100'
                                        : 'bg-gray-300'
                                    }`}
                                  ></div>
                                  <div className="ml-8">
                                    <h5 className="font-medium">Development</h5>
                                    <p className="text-sm text-gray-500">
                                      Implementation of approved designs
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div
                                    className={`absolute left-4 w-4 h-4 rounded-full -translate-x-1/2 ${
                                      progress >= 80
                                        ? 'bg-purple-600 ring-4 ring-purple-100'
                                        : 'bg-gray-300'
                                    }`}
                                  ></div>
                                  <div className="ml-8">
                                    <h5 className="font-medium">Testing</h5>
                                    <p className="text-sm text-gray-500">
                                      Quality assurance and bug fixes
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex items-start">
                                  <div
                                    className={`absolute left-4 w-4 h-4 rounded-full -translate-x-1/2 ${
                                      progress >= 100
                                        ? 'bg-purple-600 ring-4 ring-purple-100'
                                        : 'bg-gray-300'
                                    }`}
                                  ></div>
                                  <div className="ml-8">
                                    <h5 className="font-medium">Completed</h5>
                                    <p className="text-sm text-gray-500">
                                      Project delivery and final handover
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
