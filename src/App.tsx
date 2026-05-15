import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Pages
import Dashboard from './routes/index'
import Roadmap from './routes/roadmap'
import Search from './routes/search'
import Labs from './routes/labs'
import Achievements from './routes/achievements'
import Module from './routes/module'
import Phase from './routes/phase'

const queryClient = new QueryClient()

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-7xl font-bold text-gradient">404</div>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A trilha que você procurou não existe ou foi movida.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90 transition-colors"
        >
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/search" element={<Search />} />
                <Route path="/labs" element={<Labs />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/module/:moduleId" element={<Module />} />
                <Route path="/phase/:phaseId" element={<Phase />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
