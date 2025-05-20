'use client';

import { useState } from 'react';
import RequestList, { type RequestWithStatus } from './request-list';
import ApprovedRequests from './ApprovedRequest';
import type { StatusOption } from './ApprovedRequest';

export default function RequestManagement() {
  // Sample data - in a real application, this would come from your database
  const [requests, setRequests] = useState<RequestWithStatus[]>([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',

      requestType: 'Custom Template',
      templateCategory: 'E-commerce',

      features: [
        'Responsive Design',
        'E-commerce Functionality',
        'User Authentication',
        'Payment Integration',
      ],
      designPreferences: {
        style: 'Modern',
        colorScheme: 'Custom',
        references:
          'https://example.com/reference1\nhttps://example.com/reference2',
      },
      technicalRequirements: {
        responsive: true,
        frameworks: ['React', 'Next.js', 'Tailwind CSS'],
        otherTech: 'GraphQL API integration',
      },
      details:
        'We need a custom e-commerce template for our new product line. The template should be modern and focus on product presentation.',
      status: 'pending',
      submittedAt: '2025-05-10T10:30:00',
      updatedAt: '2025-05-10T10:30:00',
      projectStatus: 'in-progress',
    },
    {
      id: '2',
      name: 'Zeynep Kaya',
      email: 'zeynep@example.com',

      requestType: 'UI/UX Design',
      templateCategory: 'Portfolio',

      features: [
        'Responsive Design',
        'Blog/Content Management',
        'Contact Form',
      ],
      designPreferences: {
        style: 'Minimalist',
        colorScheme: 'Monochrome',
        references: 'https://example.com/reference3',
      },
      technicalRequirements: {
        responsive: true,
        frameworks: ['Vue.js', 'Tailwind CSS'],
        otherTech: '',
      },
      details:
        'Looking for a clean, minimalist portfolio design for a photography business.',
      status: 'reviewing',
      submittedAt: '2025-05-09T14:45:00',
      updatedAt: '2025-05-11T09:15:00',
      projectStatus: 'design-review',
    },
    {
      id: '3',
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',

      requestType: 'Full Website Development',
      templateCategory: 'Corporate',

      features: [
        'Responsive Design',
        'User Authentication',
        'Blog/Content Management',
        'Search Functionality',
        'Multi-language Support',
      ],
      designPreferences: {
        style: 'Corporate',
        colorScheme: 'Custom',
        references: '',
      },
      technicalRequirements: {
        responsive: true,
        frameworks: ['React', 'Next.js', 'Bootstrap'],
        otherTech: 'Integration with existing CRM system',
      },
      details:
        'We need a complete corporate website redesign with multiple language support and integration with our existing systems.',
      status: 'approved',
      submittedAt: '2025-05-08T11:20:00',
      updatedAt: '2025-05-12T16:30:00',
      projectStatus: 'development',
    },
    {
      id: '4',
      name: 'Ayşe Şahin',
      email: 'ayse@example.com',

      requestType: 'Template Modification',
      templateCategory: 'Blog',

      features: [
        'Responsive Design',
        'Blog/Content Management',
        'Newsletter Subscription',
      ],
      designPreferences: {
        style: 'Minimalist',
        colorScheme: 'Light Mode',
        references: '',
      },
      technicalRequirements: {
        responsive: true,
        frameworks: ['WordPress'],
        otherTech: '',
      },
      details:
        'I need modifications to an existing WordPress blog template to make it more minimalist and focused on content.',
      status: 'approved',
      submittedAt: '2025-05-07T09:10:00',
      updatedAt: '2025-05-09T13:45:00',
      projectStatus: 'completed',
    },
  ]);

  const handleStatusChange = (
    id: string,
    status: RequestWithStatus['status'],
  ) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status, updatedAt: new Date().toISOString() }
          : request,
      ),
    );
  };

  const handleProjectStatusUpdate = (
    id: string,
    projectStatus: StatusOption,
  ) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, projectStatus, updatedAt: new Date().toISOString() }
          : request,
      ),
    );
  };

  return (
    <div className="space-y-8 py-8">
      <RequestList requests={requests} onStatusChange={handleStatusChange} />

      <ApprovedRequests
        requests={requests}
        onStatusUpdate={handleProjectStatusUpdate}
      />
    </div>
  );
}
