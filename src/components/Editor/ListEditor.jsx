import React, { useRef } from 'react';
import { Plus, X, CornerDownRight } from 'lucide-react';
import './ListEditor.css';

export default function ListEditor({ section, updateSection }) {
  const inputRefs = useRef({});

  const items = section.items || [];

  /* ── Main item helpers ── */
  const addItem = (afterIndex = items.length - 1) => {
    const newItem = { id: crypto.randomUUID(), text: '', subItems: [] };
    const newItems = [...items];
    newItems.splice(afterIndex + 1, 0, newItem);
    updateSection(section.id, 'items', newItems);
    setTimeout(() => inputRefs.current[newItem.id]?.focus(), 0);
  };

  const removeItem = (itemId) => {
    if (items.length <= 1) return;
    updateSection(section.id, 'items', items.filter(i => i.id !== itemId));
  };

  const updateItemText = (itemId, text) => {
    updateSection(section.id, 'items', items.map(i => i.id === itemId ? { ...i, text } : i));
  };

  const handleMainKeyDown = (e, index, itemId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(index);
    }
    if (e.key === 'Backspace' && items[index].text === '' && items.length > 1) {
      e.preventDefault();
      removeItem(itemId);
      const prevItem = items[index - 1];
      if (prevItem) setTimeout(() => inputRefs.current[prevItem.id]?.focus(), 0);
    }
  };

  /* ── Sub-item helpers ── */
  const addSubItem = (itemId) => {
    const newSub = { id: crypto.randomUUID(), text: '' };
    updateSection(section.id, 'items', items.map(i => {
      if (i.id !== itemId) return i;
      return { ...i, subItems: [...(i.subItems || []), newSub] };
    }));
    setTimeout(() => inputRefs.current[newSub.id]?.focus(), 0);
  };

  const removeSubItem = (itemId, subId) => {
    updateSection(section.id, 'items', items.map(i => {
      if (i.id !== itemId) return i;
      return { ...i, subItems: (i.subItems || []).filter(s => s.id !== subId) };
    }));
  };

  const updateSubItemText = (itemId, subId, text) => {
    updateSection(section.id, 'items', items.map(i => {
      if (i.id !== itemId) return i;
      return { ...i, subItems: (i.subItems || []).map(s => s.id === subId ? { ...s, text } : s) };
    }));
  };

  const handleSubKeyDown = (e, itemId, subId, subItems) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubItem(itemId);
    }
    if (e.key === 'Backspace' && e.target.value === '') {
      e.preventDefault();
      removeSubItem(itemId, subId);
      const idx = subItems.findIndex(s => s.id === subId);
      const prev = subItems[idx - 1];
      if (prev) setTimeout(() => inputRefs.current[prev.id]?.focus(), 0);
    }
  };

  return (
    <div className="list-editor">
      <div className="list-items">
        {items.map((item, index) => (
          <div key={item.id} className="list-item-group">
            {/* Main Item Row */}
            <div className="list-item-row">
              <span className="list-item-bullet" />
              <input
                ref={(el) => { inputRefs.current[item.id] = el; }}
                type="text"
                className="list-item-input"
                value={item.text}
                onChange={(e) => updateItemText(item.id, e.target.value)}
                onKeyDown={(e) => handleMainKeyDown(e, index, item.id)}
                placeholder={`기능 ${index + 1}`}
              />
              <div className="list-item-actions">
                <button
                  className="list-sub-add-btn"
                  onClick={() => addSubItem(item.id)}
                  title="세부 기능 추가"
                  tabIndex={-1}
                >
                  <CornerDownRight size={12} />
                </button>
                <button
                  className="list-item-remove"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length <= 1}
                  tabIndex={-1}
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Sub-Items */}
            {(item.subItems || []).length > 0 && (
              <div className="sub-items-list">
                {(item.subItems || []).map((sub) => (
                  <div key={sub.id} className="sub-item-row">
                    <span className="sub-item-connector" />
                    <span className="sub-item-bullet" />
                    <input
                      ref={(el) => { inputRefs.current[sub.id] = el; }}
                      type="text"
                      className="sub-item-input"
                      value={sub.text}
                      onChange={(e) => updateSubItemText(item.id, sub.id, e.target.value)}
                      onKeyDown={(e) => handleSubKeyDown(e, item.id, sub.id, item.subItems || [])}
                      placeholder="세부 기능 설명..."
                    />
                    <button
                      className="list-item-remove sub"
                      onClick={() => removeSubItem(item.id, sub.id)}
                      tabIndex={-1}
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="list-add-btn" onClick={() => addItem()}>
        <Plus size={13} />
        기능 추가
      </button>
    </div>
  );
}
