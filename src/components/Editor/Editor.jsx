import React from 'react';
import { Plus, FileText } from 'lucide-react';
import SectionItem from './SectionItem';
import './Editor.css';

export default function Editor({ sections, setSections }) {
  const handleAddSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      title: '새 섹션',
      content: '',
      collapsed: false
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const moveSection = (index, direction) => {
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setSections(newSections);
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections);
    }
  };

  const toggleCollapse = (id) => {
    setSections(sections.map(s => s.id === id ? { ...s, collapsed: !s.collapsed } : s));
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>섹션 구성</h2>
        <button className="add-section-btn" onClick={handleAddSection}>
          <Plus size={14} /> 섹션 추가
        </button>
      </div>
      <div className="sections-list">
        {sections.length === 0 ? (
          <div className="empty-state">
            <FileText size={40} />
            <p>섹션이 없습니다.<br />위 버튼으로 새 섹션을 추가해 보세요.</p>
          </div>
        ) : (
          sections.map((section, index) => (
            <SectionItem
              key={section.id}
              section={section}
              index={index}
              totalLength={sections.length}
              updateSection={updateSection}
              removeSection={removeSection}
              moveSection={moveSection}
              toggleCollapse={toggleCollapse}
            />
          ))
        )}
      </div>
    </div>
  );
}
