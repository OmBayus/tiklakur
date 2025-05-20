'use client';

import { useState } from 'react';

export type RequestStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';
export type StatusOption =
  | 'in-progress'
  | 'design-review'
  | 'development'
  | 'testing'
  | 'completed';

export type UnifiedRequest = {
  id: string;
  name: string;
  email: string;
  requestType: string;
  templateCategory: string;
  status: RequestStatus;
  projectStatus?: StatusOption;
  submittedAt: string;
  updatedAt: string;
  details?: string;
  designPreferences?: {
    style: string;
    colorScheme: string;
    references: string;
  };
  features?: string[];
  technicalRequirements?: {
    responsive: boolean;
    frameworks: string[];
    otherTech: string;
  };
};

type UnifiedCardProps = {
  requests: UnifiedRequest[];
  onStatusChange?: (id: string, status: RequestStatus) => void;
  onProjectStatusChange?: (id: string, status: StatusOption) => void;
  height?: string;
};

export type RequestWithStatus = UnifiedRequest;

export default function UnifiedRequestCard({
  requests,

  height = '600px',
}: UnifiedCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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

  const getProgress = (status?: StatusOption) => {
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

  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateStr));

  return (
    <div className="max-w-4xl mx-auto ">
      <div
        className=" rounded-3xl overflow-hidden  bg-white flex flex-col"
        style={{ height }}
      >
        {/* Header */}
        <div className="bg-gray-100 text-black p-8 h-24">
          <h2 className="text-2xl font-bold">Special Template Request</h2>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-4 grow">
          {requests.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No Requests Found.
            </div>
          ) : (
            requests.map((req) => {
              const progress = getProgress(req.projectStatus);

              return (
                <div
                  key={req.id}
                  className="border border-gray-200 rounded-xl p-4  bg-white"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-3">
                    <div>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                          req.status,
                        )}`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                      <h3 className="font-semibold mt-1">{req.name}</h3>
                      <p className="text-sm text-gray-500">{req.email}</p>
                    </div>

                    <div className="text-sm text-right md:text-left space-y-1">
                      <p className="text-gray-500">
                        {req.requestType} - {req.templateCategory}
                      </p>
                      <p className="text-xs text-gray-400">
                        Submitted: {formatDate(req.submittedAt)}
                      </p>
                      {req.status === 'approved' && (
                        <p className="text-xs text-gray-400">
                          Updated: {formatDate(req.updatedAt)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {req.status === 'approved' && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">
                          Progress: {req.projectStatus}
                        </span>
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Details Toggle */}
                  <div className="mt-4">
                    <button
                      onClick={() => toggleExpand(req.id)}
                      className="text-sm text-purple-600 hover:underline"
                    >
                      {expandedId === req.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  {/* Expanded Section */}
                  {expandedId === req.id && (
                    <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>ID:</strong> {req.id}
                      </p>
                      <p>
                        <strong>Status:</strong> {req.status}
                      </p>
                      <p>
                        <strong>Project Status:</strong>{' '}
                        {req.projectStatus || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
