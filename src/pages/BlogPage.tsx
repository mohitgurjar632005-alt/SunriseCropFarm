import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, X, BookOpen, Share2, Check } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { useCart } from '../context/CartContext';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);
  const { showToast } = useCart();

  const handleShare = (post: BlogPost) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    showToast('Article link copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Knowledge From The Field
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Latest Farming Insights
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          Read the latest insights and articles on sustainable farming, health, and modern agriculture from SunriseCrop Farm.
        </p>
      </div>

      {/* Banner */}
      <div className="w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-emerald-100 p-2 md:p-3">
        <img
          src="/assets/blog_banner_1782034818828-DSeLdbL5.jpg"
          alt="SunriseCrop Farm agricultural insights"
          className="w-full max-h-[500px] object-cover rounded-2xl mx-auto bg-slate-50"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, idx) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl p-7 border border-emerald-100 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold uppercase text-[10px]">
                  {post.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {idx + 1}. {post.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {post.desc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Reading Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedPost(null)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 z-10 my-8 flex flex-col max-h-[85vh]">
            <div className="bg-emerald-900 text-white p-6 relative shrink-0">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 text-emerald-300 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold mb-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{selectedPost.category} • {selectedPost.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {selectedPost.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-emerald-200 mt-2">
                <span>By {selectedPost.author}</span>
                <span>• {selectedPost.date}</span>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-5 text-sm text-slate-700 leading-relaxed">
              <p className="text-base font-medium text-slate-900 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                {selectedPost.desc}
              </p>
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>Published by SunriseCrop Farm Editorial</span>
              <button
                onClick={() => handleShare(selectedPost)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
