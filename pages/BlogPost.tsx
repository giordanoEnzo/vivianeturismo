import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ContactFooter } from '../components/ContactFooter';
import axios from 'axios';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export function BlogPost() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch post", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
                <Navbar />
                <main className="py-20 flex justify-center items-center">
                    <div>Carregando...</div>
                </main>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
                <Navbar />
                <main className="py-20 flex justify-center items-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Post não encontrado</h2>
                        <Link to="/blog" className="text-blue-600 hover:underline">Voltar para o blog</Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <main className="py-12 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-orange-500 mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Voltar para o Blog
                    </Link>

                    <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        <div className="relative h-[400px]">
                            {post.image ? (
                                <img
                                    src={`http://localhost:3001${post.image}`}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                    Sem imagem
                                </div>
                            )}
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="flex items-center space-x-4 text-sm text-slate-400 mb-6">
                                <span className="flex items-center">
                                    <Calendar size={16} className="mr-2" />
                                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                                </span>
                                <span>•</span>
                                <span className="flex items-center">
                                    <Clock size={16} className="mr-2" />
                                    5 min de leitura
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                                {post.title}
                            </h1>

                            <div className="prose prose-lg prose-slate max-w-none">
                                {/* 
                            For safety, we are just rendering text given the simple input.
                            If rich text was used, we would clean it here.
                            Since it's a simple textarea input, we handle newlines.
                        */}
                                {post.content.split('\n').map((paragraph: string, idx: number) => (
                                    <p key={idx} className="mb-4 text-slate-600 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            <ContactFooter />
        </div>
    );
}
