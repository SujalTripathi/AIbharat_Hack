import React from 'react';
import { Shield, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

type ValidationRule = {
  test: (value: any) => boolean;
  message: string;
};

type FieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: ValidationRule[];
};

type FormErrors = {
  [key: string]: string[];
};

/**
 * Form validation utilities
 */
export class FormValidator {
  private errors: FormErrors = {};

  /**
   * Validate a single field
   */
  validateField(
    name: string,
    value: any,
    rules: FieldValidation
  ): string[] {
    const fieldErrors: string[] = [];

    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      fieldErrors.push(`${this.formatFieldName(name)} is required`);
      return fieldErrors; // Stop further validation if required field is empty
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
      return fieldErrors;
    }

    const strValue = value.toString();

    // Min length validation
    if (rules.minLength && strValue.length < rules.minLength) {
      fieldErrors.push(
        `${this.formatFieldName(name)} must be at least ${rules.minLength} characters`
      );
    }

    // Max length validation
    if (rules.maxLength && strValue.length > rules.maxLength) {
      fieldErrors.push(
        `${this.formatFieldName(name)} must not exceed ${rules.maxLength} characters`
      );
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(strValue)) {
      fieldErrors.push(`${this.formatFieldName(name)} format is invalid`);
    }

    // Custom validations
    if (rules.custom) {
      rules.custom.forEach((rule) => {
        if (!rule.test(value)) {
          fieldErrors.push(rule.message);
        }
      });
    }

    return fieldErrors;
  }

  /**
   * Validate entire form
   */
  validateForm(
    formData: { [key: string]: any },
    validationRules: { [key: string]: FieldValidation }
  ): { isValid: boolean; errors: FormErrors } {
    this.errors = {};

    Object.keys(validationRules).forEach((fieldName) => {
      const fieldErrors = this.validateField(
        fieldName,
        formData[fieldName],
        validationRules[fieldName]
      );

      if (fieldErrors.length > 0) {
        this.errors[fieldName] = fieldErrors;
      }
    });

    return {
      isValid: Object.keys(this.errors).length === 0,
      errors: this.errors
    };
  }

  /**
   * Format field name for error messages
   */
  private formatFieldName(name: string): string {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  /**
   * Get errors for a specific field
   */
  getFieldErrors(fieldName: string): string[] {
    return this.errors[fieldName] || [];
  }

  /**
   * Check if field has errors
   */
  hasFieldError(fieldName: string): boolean {
    return !!this.errors[fieldName] && this.errors[fieldName].length > 0;
  }

  /**
   * Clear all errors
   */
  clearErrors(): void {
    this.errors = {};
  }

  /**
   * Clear errors for specific field
   */
  clearFieldError(fieldName: string): void {
    delete this.errors[fieldName];
  }
}

/**
 * Common validation patterns
 */
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]{10,}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z\s]+$/,
  numeric: /^\d+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  creditCard: /^\d{13,19}$/
};

/**
 * Field Error Display Component
 */
interface FieldErrorProps {
  errors: string[];
  show?: boolean;
}

export const FieldError: React.FC<FieldErrorProps> = ({ errors, show = true }) => {
  if (!show || !errors || errors.length === 0) return null;

  return (
    <div className="mt-1 space-y-1">
      {errors.map((error, index) => (
        <div
          key={index}
          className="flex items-start space-x-2 text-red-400 text-sm animate-fadeIn"
        >
          <XCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * Form Field Component with Validation
 */
interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[];
  success?: boolean;
  hint?: string;
  icon?: React.ReactNode;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  error,
  success,
  hint,
  icon,
  className = '',
  ...props
}) => {
  const hasError = error && error.length > 0;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300">
        {label}
        {props.required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          className={`
            w-full px-4 py-3 
            ${icon ? 'pl-12' : ''}
            bg-slate-800/50 border-2 rounded-xl text-white placeholder-gray-500
            transition-all duration-300 focus:outline-none
            ${hasError
              ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20'
              : success
              ? 'border-green-500 focus:border-green-400 focus:ring-4 focus:ring-green-500/20'
              : 'border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
            }
            ${className}
          `}
          {...props}
        />

        {(hasError || success) && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {hasError ? (
              <AlertTriangle size={20} className="text-red-400" />
            ) : (
              <CheckCircle size={20} className="text-green-400" />
            )}
          </div>
        )}
      </div>

      {hint && !hasError && (
        <div className="flex items-start space-x-2 text-gray-400 text-sm">
          <Info size={14} className="mt-0.5 flex-shrink-0" />
          <span>{hint}</span>
        </div>
      )}

      <FieldError errors={error || []} />
    </div>
  );
};

/**
 * Validated Textarea Component
 */
interface ValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string[];
  success?: boolean;
  hint?: string;
  showCharCount?: boolean;
}

export const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
  label,
  error,
  success,
  hint,
  showCharCount,
  maxLength,
  value,
  className = '',
  ...props
}) => {
  const hasError = error && error.length > 0;
  const charCount = value ? value.toString().length : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-semibold text-gray-300">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>

        {showCharCount && maxLength && (
          <span className={`text-sm ${charCount > maxLength ? 'text-red-400' : 'text-gray-400'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        className={`
          w-full px-4 py-3 bg-slate-800/50 border-2 rounded-xl text-white placeholder-gray-500
          transition-all duration-300 focus:outline-none resize-none
          ${hasError
            ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20'
            : success
            ? 'border-green-500 focus:border-green-400 focus:ring-4 focus:ring-green-500/20'
            : 'border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
          }
          ${className}
        `}
        maxLength={maxLength}
        value={value}
        {...props}
      />

      {hint && !hasError && (
        <div className="flex items-start space-x-2 text-gray-400 text-sm">
          <Info size={14} className="mt-0.5 flex-shrink-0" />
          <span>{hint}</span>
        </div>
      )}

      <FieldError errors={error || []} />
    </div>
  );
};

export default FormValidator;
