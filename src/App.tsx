/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Login from './components/Login';
import GeneratorForm from './components/GeneratorForm';
import ModulTable from './components/ModulTable';
import { ModulFormData, GeneratedModul } from './types';
import { generateModulAjar } from './lib/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, LogOut } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ModulFormData | null>(null);
  const [generatedModul, setGeneratedModul] = useState<GeneratedModul | null>(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setGeneratedModul(null);
    setFormData(null);
  };

  const handleSubmit = async (data: ModulFormData) => {
    setIsLoading(true);
    setFormData(data);
    try {
      const result = await generateModulAjar(data);
      setGeneratedModul(result);
    } catch (error) {
      alert("Terjadi kesalahan saat generate modul. Silakan coba lagi.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Rail / Header */}
      <nav className="no-print glass-dark sticky top-0 z-50 px-6 py-4 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">TM GENERATOR</h1>
            <p className="text-[10px] text-mint-200 uppercase tracking-widest font-bold">PRO Edition</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-mint-100 hover:text-white transition-colors text-sm font-bold bg-white/10 px-4 py-2 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </nav>

      <main className="container mx-auto px-4 md:px-6">
        <AnimatePresence mode="wait">
          {!generatedModul ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2 mb-12">
                <h2 className="text-4xl font-extrabold text-mint-900 tracking-tight">Buat Modul Ajar Baru</h2>
                <p className="text-mint-700 max-w-xl mx-auto font-medium">
                  Lengkapi data di bawah ini untuk menghasilkan perencanaan pembelajaran mendalam yang terstruktur dan kreatif.
                </p>
              </div>
              <GeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ModulTable 
                data={generatedModul} 
                formInput={formData!} 
                onBack={() => setGeneratedModul(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="no-print mt-20 border-t border-mint-200 py-10 text-center">
        <p className="text-sm font-bold text-mint-700 uppercase tracking-widest">
          TM GENERATOR © {new Date().getFullYear()} • Fidhal Touna AI
        </p>
        <p className="text-xs text-mint-500 mt-1">
          Designed for Excellence in Education
        </p>
      </footer>
    </div>
  );
}
