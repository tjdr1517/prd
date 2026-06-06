import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import './App.css'
import Editor from './components/Editor/Editor'
import Preview from './components/Preview/Preview'
import { downloadMarkdown } from './utils/exportMarkdown'
import { Group, Panel, Separator } from 'react-resizable-panels'

const DEFAULT_SECTIONS = [
  { id: crypto.randomUUID(), title: '개요', type: 'text', content: '프로젝트의 전반적인 개요를 작성합니다.', collapsed: false },
  { id: crypto.randomUUID(), title: '목표 및 대상', type: 'text', content: '이 프로젝트가 달성하고자 하는 목표와 주요 타겟 사용자를 정의합니다.', collapsed: false },
  { id: crypto.randomUUID(), title: '핵심 기능', type: 'list', items: [{ id: crypto.randomUUID(), text: '' }, { id: crypto.randomUUID(), text: '' }, { id: crypto.randomUUID(), text: '' }], collapsed: false },
  { id: crypto.randomUUID(), title: '화면 구성', type: 'text', content: '주요 화면들의 레이아웃과 구성 요소를 설명합니다.', collapsed: false },
  { id: crypto.randomUUID(), title: '기술 스택', type: 'list', items: [{ id: crypto.randomUUID(), text: '' }, { id: crypto.randomUUID(), text: '' }, { id: crypto.randomUUID(), text: '' }], collapsed: false },
  { id: crypto.randomUUID(), title: '범위 (할 것 vs 안 할 것)', type: 'text', content: '### In-Scope\n- \n\n### Out-of-Scope\n- ', collapsed: false }
]

function App() {
  const [sections, setSections] = useState(DEFAULT_SECTIONS)
  const [docTitle, setDocTitle] = useState('')

  const handleDownload = () => {
    downloadMarkdown(sections, docTitle)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1><FileText size={20} className="logo-icon" /> PRD</h1>
          <div className="header-divider" />
          <input
            type="text"
            className="doc-title-input"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            placeholder="문서 제목을 입력하세요..."
          />
        </div>
        <div className="header-actions">
          <button className="download-btn" onClick={handleDownload}>
            <Download size={15} />
            다운로드 (.md)
          </button>
        </div>
      </header>
      <main className="app-main">
        <Group orientation="horizontal">
          <Panel defaultSize={50} minSize={25}>
            <section className="editor-pane">
              <Editor sections={sections} setSections={setSections} />
            </section>
          </Panel>
          
          <Separator className="resize-handle">
            <div className="resize-handle-inner" />
          </Separator>
          
          <Panel defaultSize={50} minSize={25}>
            <section className="preview-pane">
              <Preview sections={sections} docTitle={docTitle} />
            </section>
          </Panel>
        </Group>
      </main>
    </div>
  )
}

export default App
