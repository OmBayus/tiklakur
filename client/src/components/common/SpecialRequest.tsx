'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';

type SpecialRequestProps = {
  onSubmit?: (data: SpecialRequestData) => void;
  className?: string;
};

export type SpecialRequestData = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  requestType: string;
  templateCategory: string;
  budget: string;
  timeline: string;
  features: string[];
  designPreferences: {
    style: string;
    colorScheme: string;
    references: string;
  };
  technicalRequirements: {
    responsive: boolean;
    frameworks: string[];
    otherTech: string;
  };
  details: string;
};

const requestTypes = [
  'Custom Template',
  'Template Modification',
  'Theme Integration',
  'UI/UX Design',
  'Full Website Development',
  'Other',
];

const templateCategories = [
  'E-commerce',
  'Portfolio',
  'Blog',
  'Corporate',
  'Landing Page',
  'Admin Dashboard',
  'Mobile App UI',
  'Other',
];

const budgetRanges = [
  '$100 - $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000+',
];

const timelineOptions = [
  'Less than 1 week',
  '1-2 weeks',
  '2-4 weeks',
  '1-2 months',
  'Flexible',
];

const featureOptions = [
  'Responsive Design',
  'E-commerce Functionality',
  'User Authentication',
  'Blog/Content Management',
  'Search Functionality',
  'Payment Integration',
  'Social Media Integration',
  'Contact Form',
  'Newsletter Subscription',
  'Multi-language Support',
  'Admin Dashboard',
];

const frameworkOptions = [
  'React',
  'Vue.js',
  'Angular',
  'Next.js',
  'WordPress',
  'Shopify',
  'Bootstrap',
  'Tailwind CSS',
];

const styleOptions = [
  'Minimalist',
  'Modern',
  'Corporate',
  'Creative',
  'Luxury',
  'Playful',
  'Retro/Vintage',
  'Flat Design',
];

const colorSchemeOptions = [
  'Monochrome',
  'Analogous',
  'Complementary',
  'Pastel',
  'Vibrant',
  'Dark Mode',
  'Light Mode',
  'Custom',
];

export default function SpecialRequestForm({
  onSubmit,
  className = '',
}: SpecialRequestProps) {
  const [formData, setFormData] = useState<SpecialRequestData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    requestType: 'Custom Template',
    templateCategory: 'E-commerce',
    budget: '$500 - $1,000',
    timeline: '2-4 weeks',
    features: [],
    designPreferences: {
      style: 'Modern',
      colorScheme: 'Custom',
      references: '',
    },
    technicalRequirements: {
      responsive: true,
      frameworks: ['React'],
      otherTech: '',
    },
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [dropdowns, setDropdowns] = useState({
    requestType: false,
    templateCategory: false,
    budget: false,
    timeline: false,
    style: false,
    colorScheme: false,
  });

  const dropdownRefs = {
    requestType: useRef<HTMLDivElement>(null),
    templateCategory: useRef<HTMLDivElement>(null),
    budget: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    style: useRef<HTMLDivElement>(null),
    colorScheme: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  // Reset form after success message is shown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          requestType: 'Custom Template',
          templateCategory: 'E-commerce',
          budget: '$500 - $1,000',
          timeline: '2-4 weeks',
          features: ['Responsive Design'],
          designPreferences: {
            style: 'Modern',
            colorScheme: 'Custom',
            references: '',
          },
          technicalRequirements: {
            responsive: true,
            frameworks: ['React'],
            otherTech: '',
          },
          details: '',
        });
      }, 5000); // 5 seconds
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const features = [...prev.features];

      if (features.includes(feature)) {
        return { ...prev, features: features.filter((f) => f !== feature) };
      } else {
        return { ...prev, features: [...features, feature] };
      }
    });
  };

  const handleFrameworkToggle = (framework: string) => {
    setFormData((prev) => {
      const frameworks = [...prev.technicalRequirements.frameworks];

      if (frameworks.includes(framework)) {
        return {
          ...prev,
          technicalRequirements: {
            ...prev.technicalRequirements,
            frameworks: frameworks.filter((f) => f !== framework),
          },
        };
      } else {
        return {
          ...prev,
          technicalRequirements: {
            ...prev.technicalRequirements,
            frameworks: [...frameworks, framework],
          },
        };
      }
    });
  };

  const handleDropdownSelect = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Close the dropdown
    const dropdownKey = field.includes('.') ? field.split('.')[1] : field;
    setDropdowns((prev) => ({ ...prev, [dropdownKey]: false }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Eğer son adımda değilsek, sadece bir sonraki adıma geç
    if (currentStep < 3) {
      nextStep();
      return;
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      // API çağrısını simüle et
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onSubmit) {
        onSubmit(formData);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-10 px-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center 
            ${
              currentStep === 1
                ? 'bg-black text-white'
                : 'bg-white text-black border border-gray-300'
            }`}
        >
          <span className="text-lg font-medium">1</span>
        </div>
        <span
          className={`text-sm mt-2 ${
            currentStep >= 1 ? 'text-black font-medium' : 'text-gray-400'
          }`}
        >
          Basic Info
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center 
            ${
              currentStep === 2
                ? 'bg-black text-white'
                : 'bg-white text-black border border-gray-300'
            }`}
        >
          <span className="text-lg font-medium">2</span>
        </div>
        <span
          className={`text-sm mt-2 ${
            currentStep >= 2 ? 'text-black font-medium' : 'text-gray-400'
          }`}
        >
          Project Details
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center 
            ${
              currentStep === 3
                ? 'bg-black text-white'
                : 'bg-white text-black border border-gray-300'
            }`}
        >
          <span className="text-lg font-medium">3</span>
        </div>
        <span
          className={`text-sm mt-2 ${
            currentStep >= 3 ? 'text-black font-medium' : 'text-gray-400'
          }`}
        >
          Technical Specs
        </span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company/Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            placeholder="Your company name (optional)"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            placeholder="Your phone number (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="requestType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Request Type *
          </label>
          <div className="relative" ref={dropdownRefs.requestType}>
            <div
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
              onClick={() => toggleDropdown('requestType')}
            >
              <span>{formData.requestType}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  dropdowns.requestType ? 'rotate-180' : ''
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
            </div>

            {dropdowns.requestType && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-xl">
                <ul className="py-1 max-h-60 overflow-auto">
                  {requestTypes.map((type) => (
                    <li
                      key={type}
                      onClick={() => handleDropdownSelect('requestType', type)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        formData.requestType === type
                          ? 'bg-gray-100 font-medium'
                          : ''
                      }`}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="templateCategory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Template Category *
          </label>
          <div className="relative" ref={dropdownRefs.templateCategory}>
            <div
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
              onClick={() => toggleDropdown('templateCategory')}
            >
              <span>{formData.templateCategory}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  dropdowns.templateCategory ? 'rotate-180' : ''
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
            </div>

            {dropdowns.templateCategory && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-xl">
                <ul className="py-1 max-h-60 overflow-auto">
                  {templateCategories.map((category) => (
                    <li
                      key={category}
                      onClick={() =>
                        handleDropdownSelect('templateCategory', category)
                      }
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        formData.templateCategory === category
                          ? 'bg-gray-100 font-medium'
                          : ''
                      }`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Budget Range *
          </label>
          <div className="relative" ref={dropdownRefs.budget}>
            <div
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
              onClick={() => toggleDropdown('budget')}
            >
              <span>{formData.budget}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  dropdowns.budget ? 'rotate-180' : ''
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
            </div>

            {dropdowns.budget && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-xl">
                <ul className="py-1 max-h-60 overflow-auto">
                  {budgetRanges.map((range) => (
                    <li
                      key={range}
                      onClick={() => handleDropdownSelect('budget', range)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        formData.budget === range
                          ? 'bg-gray-100 font-medium'
                          : ''
                      }`}
                    >
                      {range}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="timeline"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Timeline *
          </label>
          <div className="relative" ref={dropdownRefs.timeline}>
            <div
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
              onClick={() => toggleDropdown('timeline')}
            >
              <span>{formData.timeline}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  dropdowns.timeline ? 'rotate-180' : ''
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
            </div>

            {dropdowns.timeline && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-xl">
                <ul className="py-1 max-h-60 overflow-auto">
                  {timelineOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleDropdownSelect('timeline', option)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        formData.timeline === option
                          ? 'bg-gray-100 font-medium'
                          : ''
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Required Features *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {featureOptions.map((feature) => (
            <div key={feature} className="flex items-center">
              <div
                onClick={() => handleFeatureToggle(feature)}
                className={`h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
                  formData.features.includes(feature)
                    ? 'bg-purple-600 border-purple-600'
                    : 'bg-white'
                }`}
              >
                {formData.features.includes(feature) && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <label
                onClick={() => handleFeatureToggle(feature)}
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="designPreferences.style"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Design Style *
          </label>
          <div className="relative" ref={dropdownRefs.style}>
            <div
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
              onClick={() => toggleDropdown('style')}
            >
              <span>{formData.designPreferences.style}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  dropdowns.style ? 'rotate-180' : ''
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
            </div>

            {dropdowns.style && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-xl">
                <ul className="py-1 max-h-60 overflow-auto">
                  {styleOptions.map((style) => (
                    <li
                      key={style}
                      onClick={() =>
                        handleDropdownSelect('designPreferences.style', style)
                      }
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        formData.designPreferences.style === style
                          ? 'bg-gray-100 font-medium'
                          : ''
                      }`}
                    >
                      {style}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="designPreferences.colorScheme"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Color Scheme *
          </label>
          <div className="relative" ref={dropdownRefs.colorScheme}>
            <div
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
              onClick={() => toggleDropdown('colorScheme')}
            >
              <span>{formData.designPreferences.colorScheme}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  dropdowns.colorScheme ? 'rotate-180' : ''
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
            </div>

            {dropdowns.colorScheme && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-xl">
                <ul className="py-1 max-h-60 overflow-auto">
                  {colorSchemeOptions.map((scheme) => (
                    <li
                      key={scheme}
                      onClick={() =>
                        handleDropdownSelect(
                          'designPreferences.colorScheme',
                          scheme,
                        )
                      }
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        formData.designPreferences.colorScheme === scheme
                          ? 'bg-gray-100 font-medium'
                          : ''
                      }`}
                    >
                      {scheme}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="designPreferences.references"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Reference Websites
        </label>
        <textarea
          id="designPreferences.references"
          name="designPreferences.references"
          value={formData.designPreferences.references}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
          placeholder="Please provide links to websites or templates that you like."
        />
      </div>

      <div>
        <label
          htmlFor="details"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project Details *
        </label>
        <textarea
          id="details"
          name="details"
          required
          value={formData.details}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
          placeholder="Please describe your project in detail."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-3">
          <div
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                technicalRequirements: {
                  ...prev.technicalRequirements,
                  responsive: !prev.technicalRequirements.responsive,
                },
              }))
            }
            className={`h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
              formData.technicalRequirements.responsive
                ? 'bg-purple-600 border-purple-600'
                : 'bg-white'
            }`}
          >
            {formData.technicalRequirements.responsive && (
              <div className="w-2 h-2 rounded-full bg-white"></div>
            )}
          </div>
          <label
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                technicalRequirements: {
                  ...prev.technicalRequirements,
                  responsive: !prev.technicalRequirements.responsive,
                },
              }))
            }
            className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
          >
            Responsive Design (works on mobile, tablet, and desktop)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Frameworks
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {frameworkOptions.map((framework) => (
            <div key={framework} className="flex items-center">
              <div
                onClick={() => handleFrameworkToggle(framework)}
                className={`h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
                  formData.technicalRequirements.frameworks.includes(framework)
                    ? 'bg-purple-600 border-purple-600'
                    : 'bg-white'
                }`}
              >
                {formData.technicalRequirements.frameworks.includes(
                  framework,
                ) && <div className="w-2 h-2 rounded-full bg-white"></div>}
              </div>
              <label
                onClick={() => handleFrameworkToggle(framework)}
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                {framework}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="technicalRequirements.otherTech"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Other Requirements
        </label>
        <textarea
          id="technicalRequirements.otherTech"
          name="technicalRequirements.otherTech"
          value={formData.technicalRequirements.otherTech}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
          placeholder="Please specify any other technical requirements."
        />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600 mb-4">
          By submitting this form, you agree to our terms of service and privacy
          policy.
        </p>
      </div>
    </div>
  );

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div
        className="border border-gray-300 rounded-3xl overflow-hidden shadow-lg bg-white"
        style={{ maxWidth: '100%' }}
      >
        <div className="bg-black text-white p-8">
          <h2 className="text-2xl font-bold">Special Template Request</h2>
          <p className="text-gray-300 mt-2">
            Tell us about your specific template needs and our design team will
            create a custom solution for you.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for your request. We will get back to you within 1-2
              business days.
            </p>

            <div className="mt-4 text-sm text-gray-500">
              <p>This window will automatically close in a few seconds...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="relative mb-8">{renderStepIndicator()}</div>

            <div className="mb-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="cursor-pointer px-6 py-3 text-base border border-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:bg-gray-50"
                >
                  Geri
                </button>
              )}
              <div className="flex-1" />
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="cursor-pointer px-6 py-3 text-base bg-black text-white rounded-xl font-medium transition-all duration-200 hover:bg-gray-800"
                >
                  İleri
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="cursor-pointer px-6 py-3 text-base bg-black text-white rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 disabled:opacity-70 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      İşleniyor...
                    </>
                  ) : (
                    'Gönder'
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
