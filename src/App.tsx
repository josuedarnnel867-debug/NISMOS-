/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Play, 
  Layout, 
  Sparkles, 
  ChevronRight, 
  Download, 
  Presentation, 
  Video, 
  Rocket, 
  CheckCircle2,
  Clock,
  Image as LucideImage,
  MessageSquare,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateAdConcept, AdConcept } from './services/geminiService';

export default function App() {
  const [businessName, setBusinessName] = useState('');
  const [product, setProduct] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<AdConcept | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !product) return;

    setLoading(true);
    try {
      const result = await generateAdConcept(businessName, product, targetAudience);
      setConcept(result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Désolé, une erreur est survenue lors de la génération. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand/20 selection:text-brand bg-surface text-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Presentation className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white italic font-display">AdPower</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#solutions" className="hover:text-white transition-colors">Plateforme</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">Méthode</a>
              <a href="#generator" className="bg-brand text-white px-5 py-2 rounded-xl hover:bg-brand/90 transition-all font-bold">Nouvelle Pub</a>
            </div>

            <button className="md:hidden p-2 text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-slate-900 border-b border-slate-800 p-4 absolute w-full"
            >
              <div className="flex flex-col gap-4 text-sm font-medium">
                <a href="#solutions" className="text-slate-400" onClick={() => setIsMenuOpen(false)}>Plateforme</a>
                <a href="#how-it-works" className="text-slate-400" onClick={() => setIsMenuOpen(false)}>Méthode</a>
                <a href="#generator" className="text-brand" onClick={() => setIsMenuOpen(false)}>Nouvelle Pub</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid Header / Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-8 bento-card p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-wider mb-6 border border-brand/20">
                <Sparkles size={12} />
                L'IA au service du Marketing
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-medium leading-[0.9] text-white mb-6">
                Vos slides en <span className="text-brand italic font-black">Publicités</span> Pro.
              </h1>
              <p className="text-slate-400 mb-8 max-w-lg leading-relaxed text-lg">
                Utilisez la puissance de PowerPoint combinée à notre intelligence artificielle pour générer des scripts et des storyboards publicitaires d'impact.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap gap-4">
              <a href="#generator" className="px-8 py-4 bg-brand text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-brand/20">
                Générer un Concept <ArrowRight size={18} />
              </a>
              <button className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-colors">
                Templates Premium
              </button>
            </div>

            {/* Abstract Background pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand blur-[120px] rounded-full" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bento-card p-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-900/50"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider italic">Analyse du Marché</h3>
                <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                  <Rocket size={16} />
                </div>
              </div>
              <div className="text-5xl font-light tracking-tight text-white mb-2">94%</div>
              <p className="text-xs text-slate-500 leading-relaxed">Augmentation de la rétention client via des publicités basées sur le Storytelling Visuel.</p>
            </div>
            
            <div className="mt-8 flex items-end gap-1 h-24">
              {[40, 60, 30, 90, 50, 75, 45].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-800 rounded-t-lg transition-all hover:bg-brand" style={{ height: `${h}%` }} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Second Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bento-card p-6 border-brand/20 bg-brand/5 group cursor-pointer"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Export Vidéo 4K</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Exportez directement vos présentations en format vertical (9:16) pour TikTok et Instagram Reels.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-brand font-bold text-sm">
                En savoir plus <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>

          {/* Generator Form Integration */}
          <motion.div 
            id="generator"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-8 bento-card p-8 md:p-10 bg-slate-900 border-white/5 relative"
          >
             <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 border-r border-slate-800 pr-6 hidden lg:block">
                  <h2 className="text-2xl font-display font-medium text-white mb-4 italic">Concevez votre publicité</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">Remplissez ces quelques informations pour que notre IA puisse structurer votre prochaine campagne PowerPoint.</p>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <div className="w-6 h-6 rounded-full border border-slate-800 flex items-center justify-center text-brand">1</div>
                      Contexte Business
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <div className="w-6 h-6 rounded-full border border-slate-800 flex items-center justify-center text-slate-700">2</div>
                      Analyse Cible
                    </div>
                  </div>
                </div>

                <form onSubmit={handleGenerate} className="lg:col-span-2 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Entreprise</label>
                       <input 
                        type="text" 
                        placeholder="Ex: Luminos Coffee"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand focus:bg-slate-700/50 transition-all text-white placeholder:text-slate-600"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Produit / Service</label>
                       <input 
                        type="text" 
                        placeholder="Ex: Abonnement Café"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand focus:bg-slate-700/50 transition-all text-white placeholder:text-slate-600"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Cible Marketing</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Jeunes actifs en télétravail"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand focus:bg-slate-700/50 transition-all text-white placeholder:text-slate-600"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-brand rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand/90 focus:ring-4 focus:ring-brand/30 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <>Générer le Storyboard <Sparkles size={18} /></>
                    )}
                  </button>
                </form>
             </div>
          </motion.div>
        </div>

        {/* Results Section Re-styled as Bento Cells */}
        <div ref={resultsRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {concept && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Result Title Card */}
                <div className="bento-card p-8 border-brand/30 bg-brand/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">{concept.title}</h2>
                    <p className="text-brand font-bold text-lg italic">"{concept.hook}"</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors shrink-0">
                    <Download size={18} /> Télécharger le Plan
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Storyboard Content */}
                  <div className="md:col-span-8 space-y-4">
                    {concept.slides.map((slide, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bento-card p-6 bg-slate-900 flex gap-6"
                      >
                        <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
                          <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-400">0{i+1}</span>
                          <div className="w-px h-full bg-slate-800" />
                        </div>
                        <div className="flex-grow space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-lg text-white">{slide.title}</h4>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded border border-slate-700 flex items-center gap-1">
                              <Clock size={10} /> {slide.duration}s
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{slide.description}</p>
                          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 border-dashed">
                             <p className="text-[10px] uppercase font-bold text-brand mb-2 flex items-center gap-1 tracking-widest">
                                <LucideImage size={10} /> Montage PowerPoint
                             </p>
                             <p className="text-xs text-slate-300 italic">{slide.visualSuggestion}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Script Content */}
                  <div className="md:col-span-4">
                    <div className="sticky top-24 space-y-4">
                      <div className="bento-card p-6 bg-slate-900 border-brand/20">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 block">Script de Narration</label>
                        <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                          {concept.scripts}
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center text-brand">
                            <MessageSquare size={18} />
                          </div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Copywriting IA</p>
                        </div>
                      </div>

                      {/* Export Tip Card */}
                      <div className="bento-card p-6 bg-blue-600 text-white">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                           <Rocket size={16} /> Tip pour l'Export
                        </h4>
                        <p className="text-xs text-blue-100 leading-relaxed">
                          Utilisez les transitions 'Morph' entre vos slides pour un effet professionnel sans effort. Exportez en 1080p pour le meilleur compromis poids/qualité.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!concept && !loading && (
            <div className="bento-card p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center text-slate-600 mb-6">
                <Layout size={40} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Structure de Campagne Prête</h3>
              <p className="text-slate-500 max-w-sm text-sm">Entrez vos détails business ci-dessus pour débloquer votre storyboard publicitaire intelligent.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer styled as a bento footer */}
      <footer className="mt-12 py-12 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Presentation className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white font-display italic">AdPower</span>
            </div>
            <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-600">
               <a href="#" className="hover:text-brand transition-colors">Politique</a>
               <a href="#" className="hover:text-brand transition-colors">Conditions</a>
            </div>
            <div className="text-right text-xs text-slate-600">
              © 2026 AdPower Production. Propulsé par Google Gemini.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

