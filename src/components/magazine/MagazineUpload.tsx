import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, X, CheckCircle2, Loader2 } from 'lucide-react';

export const MagazineUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    // Simulate upload to external storage
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setIsSuccess(true);
    setFile(null);
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="py-24 px-4 md:px-8 max-w-[1440px] mx-auto border-t border-white/10">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-[2px] w-12 bg-white" />
        <span className="text-xs font-heading tracking-[0.5em] uppercase">CONTRIBUTE TO ONLYDJS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-heading uppercase leading-tight mb-8">
            SUBMIT YOUR<br />EDITORIAL CONTENT
          </h2>
          <p className="text-lg text-text-secondary mb-8 italic">
            "OnlyDJS Magazine is a community-driven platform. We welcome high-quality photography and editorial submissions from the global electronic music scene."
          </p>
          <ul className="space-y-4 text-sm font-black tracking-widest uppercase opacity-60">
            <li className="flex items-center gap-3"><CheckCircle2 size={16} /> HIGH-RES PHOTOGRAPHY (3:2)</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} /> EXCLUSIVE INTERVIEWS</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} /> EVENT COVERAGE</li>
          </ul>
        </div>

        <div className="bg-white/5 p-12 border border-white/10 relative overflow-hidden">
          {!isSuccess ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8">
                {isUploading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
              </div>
              
              <h3 className="text-xl font-black uppercase mb-4">
                {isUploading ? 'UPLOADING TO STORAGE...' : 'DRAG & DROP MEDIA'}
              </h3>
              <p className="text-xs text-text-secondary tracking-widest uppercase mb-8">
                MAX FILE SIZE: 25MB • FORMATS: JPG, PNG, WEBP
              </p>

              <label className="cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <span className="btn-primary inline-block">
                  {file ? file.name : 'SELECT FILE'}
                </span>
              </label>

              {file && !isUploading && (
                <button 
                  onClick={handleUpload}
                  className="mt-6 text-[10px] font-black tracking-[0.3em] uppercase underline underline-offset-4 hover:text-text-interactive"
                >
                  CONFIRM UPLOAD
                </button>
              )}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-8 text-black">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">SUBMISSION RECEIVED</h3>
              <p className="text-xs text-text-secondary tracking-widest uppercase">
                OUR EDITORIAL TEAM WILL REVIEW YOUR CONTENT SHORTLY.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
