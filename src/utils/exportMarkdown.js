export function generateMarkdown(sections, docTitle = '') {
  let md = '';

  sections.forEach((section) => {
    if (section.title.trim() !== '') {
      md += `## ${section.title}\n\n`;
    }

    if (section.type === 'list') {
      const items = (section.items || []).filter(i => i.text.trim() !== '' || (i.subItems || []).some(s => s.text.trim() !== ''));
      if (items.length > 0) {
        const lines = [];
        items.forEach(i => {
          if (i.text.trim()) lines.push(`- ${i.text}`);
          (i.subItems || []).filter(s => s.text.trim()).forEach(s => {
            lines.push(`  - ${s.text}`);
          });
        });
        md += lines.join('\n') + '\n\n';
      } else {
        md += `(내용 없음)\n\n`;
      }
    } else {
      const content = section.content || '';
      if (content.trim() !== '') {
        md += `${content}\n\n`;
      } else {
        md += `(내용 없음)\n\n`;
      }
    }

    md += `---\n\n`;
  });

  return md;
}

export function downloadMarkdown(sections, docTitle = 'PRD') {
  const title = docTitle.trim() || 'PRD';
  const mdHeader = title ? `# ${title}\n\n` : '';
  const mdContent = mdHeader + generateMarkdown(sections, title);
  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const filename = `${title.replace(/\s+/g, '_')}.md`;
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

