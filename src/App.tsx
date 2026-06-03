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
  
  // TAMBAHAN: State kontrol navigasi halaman ('form' atau 'result')
  const [currentView, setCurrentView] = useState<'form' | 'result'>('form');

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setGeneratedModul(null);
    setFormData(null);
    setCurrentView('form');
  };

  const handleSubmit = async (data: ModulFormData) => {
    setIsLoading(true);
    setFormData(data);
    try {
      const result = await generateModulAjar(data);
      setGeneratedModul(result);
      setCurrentView('result'); // Alihkan ke halaman tabel hasil jika sukses
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
    <div className="min-h-screen bg-white">
      {/* Navigation Rail / Header */}
      <nav className="no-print bg-gradient-to-r from-blue-900 to-teal-800 sticky top-0 z-50 px-6 py-4 mb-8 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">SD NEGERI 1 AMPANA KOTA</h1>
            <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">TM Generator PRO Edition</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors text-sm font-bold bg-white/10 px-4 py-2 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </nav>

      <main className="container mx-auto px-4 md:px-6">
        <AnimatePresence mode="wait">
          {/* PERBAIKAN: Penentuan halaman diubah menggunakan state currentView */}
          {currentView === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2 mb-12">
                <h2 className="text-4xl font-extrabold text-blue-900 tracking-tight">Buat Modul Ajar Baru</h2>
                <p className="text-teal-800 max-w-xl mx-auto font-medium">
                  Lengkapi data di bawah ini untuk menghasilkan perencanaan pembelajaran mendalam yang terstruktur dan kreatif.
                </p>
              </div>
              
              {/* PERBAIKAN: Kirimkan fungsi onViewPrevious ke GeneratorForm agar bisa diklik instan */}
              <GeneratorForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                savedData={formData} 
                onViewPrevious={() => setCurrentView('result')} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* PERBAIKAN: Klik 'Edit Data / Kembali' tidak lagi menghapus data lama, cukup ganti view */}
              <ModulTable 
                data={generatedModul!} 
                formInput={formData!} 
                onBack={() => setCurrentView('form')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="no-print mt-20 border-t border-blue-100 py-10 text-center">
        <p className="text-sm font-bold text-teal-800 uppercase tracking-widest">
          TM GENERATOR © {new Date().getFullYear()} • <span className="text-amber-600">Fidhal Touna AI</span>
        </p>
        <p className="text-xs text-blue-500 mt-1">
          version : 2026.6.1
        </p>
      </footer>
    </div>
  );
}
