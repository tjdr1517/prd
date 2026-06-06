import React from 'react';
import { Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronRight, AlignLeft, List } from 'lucide-react';
import ListEditor from './ListEditor';
import './SectionItem.css';

export default function SectionItem({ section, index, totalLength, updateSection, removeSection, moveSection, toggleCollapse }) {

  const toggleType = () => {
    if (section.type === 'list') {
      // Convert list items to text
      const content = (section.items || []).map(i => `- ${i.text}`).join('\n');
      updateSection(section.id, 'type', 'text');
      updateSection(section.id, 'content', content);
    } else {
      // Convert text to list items
      const lines = (section.content || '').split('\n').filter(Boolean);
      const items = lines.length > 0
        ? lines.map(line => ({ id: crypto.randomUUID(), text: line.replace(/^[-*]\s*/, '') }))
        : [{ id: crypto.randomUUID(), text: '' }];
      updateSection(section.id, 'type', 'list');
      updateSection(section.id, 'items', items);
    }
  };

  return (
    <div className={`section-card ${section.collapsed ? 'is-collapsed' : ''}`}>
      <div className="section-card-header">
        <button className="collapse-btn" onClick={() => toggleCollapse(section.id)} title={section.collapsed ? '펼치기' : '접기'}>
          {section.collapsed ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
        </button>
        <input
          type="text"
          className="section-title-input"
          value={section.title}
          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
          placeholder="섹션 제목"
        />
        <div className="section-actions">
          <button className="icon-btn type-toggle" onClick={toggleType} title={section.type === 'list' ? '텍스트 모드로 전환' : '리스트 모드로 전환'}>
            {section.type === 'list' ? <AlignLeft size={14} /> : <List size={14} />}
          </button>
          <div className="section-actions-divider" />
          <button className="icon-btn" onClick={() => moveSection(index, 'up')} disabled={index === 0} title="위로">
            <ArrowUp size={14} />
          </button>
          <button className="icon-btn" onClick={() => moveSection(index, 'down')} disabled={index === totalLength - 1} title="아래로">
            <ArrowDown size={14} />
          </button>
          <button className="icon-btn danger" onClick={() => removeSection(section.id)} title="삭제">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {!section.collapsed && (
        section.type === 'list'
          ? <ListEditor section={section} updateSection={updateSection} />
          : (
            <div className="section-card-body">
              <textarea
                className="section-content-input"
                value={section.content || ''}
                onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                placeholder="내용을 마크다운으로 입력하세요..."
              />
            </div>
          )
      )}
    </div>
  );
}
