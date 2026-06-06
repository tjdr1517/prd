import React from 'react';
import ReactMarkdown from 'react-markdown';
import { generateMarkdown } from '../../utils/exportMarkdown';
import './Preview.css';

export default function Preview({ sections, docTitle }) {
  const markdownContent = generateMarkdown(sections, docTitle);

  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-label">미리보기</span>
      </div>
      <div className="preview-content markdown-body">
        {docTitle && <h1 className="preview-doc-title">{docTitle}</h1>}
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
}
