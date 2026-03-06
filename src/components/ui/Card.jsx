import React from 'react';

export function Card({ children, className = '', hover = false }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden ${hover ? 'hover:shadow-lg transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-4 border-b border-gray-100 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-4 border-t border-gray-100 ${className}`}>{children}</div>;
}