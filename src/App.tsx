import { memo, useState } from 'react'

import Layout from './Layout/Layout'

import CardEditor from './components/CardEditor/CardEditor'
import Template from './components/Templates/Template'

import Header from './sections/Header'
import { StateProvider } from './store/store'

import './App.css'

function App() {
  const [showCardEditor, setShowCardEditor] = useState<boolean>(false)

  const toggleCardEditor = () => {
    setShowCardEditor(prev => !prev)
  }

  return (
    <>
      <Layout>
        <StateProvider>
          <div className='p-2 bg-slate-700 h-screen'>
            <Header />
            {showCardEditor ? <CardEditor handleShowTemplates={toggleCardEditor} /> : <Template handleTemplateClick={toggleCardEditor} />}
          </div>
        </StateProvider>
      </Layout>
    </>
  )
}

export default memo(App)
