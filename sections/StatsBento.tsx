
import React from 'react';
import { PERSONAL_INFO, SKILLS } from '../constants';
import { Button } from '../components/Button';

export const StatsBento = () => (
  <section className="py-20 bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bento-card p-10 rounded-[2.5rem] bg-white flex flex-col justify-center space-y-6">
            <h3 className="text-3xl font-bold text-slate-900">Snapshot</h3>
            <p className="text-slate-500 max-w-xl leading-relaxed font-medium">
              Over the last 8 years, I've specialized in transforming complex business requirements into elegant technical architectures.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects">
                <Button variant="outline" size="md" className="rounded-xl">Case Studies</Button>
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 bento-card p-8 rounded-[2.5rem] bg-indigo-600 text-white flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">Experience</p>
              <h3 className="text-4xl font-bold">8+ Years</h3>
            </div>
            <div className="relative z-10 pt-8">
              <p className="text-indigo-100 text-sm leading-relaxed">Leading engineering teams and architecting cloud-scale solutions.</p>
            </div>
          </div>
          <div className="lg:col-span-4 bento-card p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col justify-between">
            <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Core Stack</p>
            <div className="grid grid-cols-4 gap-4">
              {SKILLS.slice(0, 8).map((skill, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-indigo-500 transition-colors" title={skill.name}>
                  <i className={skill.icon}></i>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 bento-card p-8 rounded-[2.5rem] flex flex-wrap items-center justify-between gap-6 bg-white">
            <p className="text-sm font-medium text-slate-500">
              Trusted by <span className="text-slate-900 font-bold">50+ startups</span> across the globe.
            </p>
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.github} className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-brands fa-github text-2xl"></i></a>
              <a href={PERSONAL_INFO.linkedin} className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-brands fa-linkedin text-2xl"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
