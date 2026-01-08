import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { ContactFooter } from '../components/ContactFooter';
import axios from 'axios';
import { getImageUrl } from '../config';

const API_URL = '/api';

export function Blog() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`${API_URL}/posts`).then(res => setPosts(res.data)).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <main className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Blog de Viagem</h2>
                        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
                        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                            Dicas, roteiros e inspirações para sua próxima aventura.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    {post.image ? (
                                        <img
                                            src={getImageUrl(post.image)}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Sem Imagem</div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-3">{post.content}</p>
                                    <Link to={`/blog/${post.id}`} className="text-orange-600 font-semibold hover:text-orange-700">
                                        Ler mais →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                    {posts.length === 0 && (
                        <div className="text-center text-slate-500 py-12">
                            Nenhum post encontrado.
                        </div>
                    )}
                </div>
            </main>
            <ContactFooter />
        </div>
    );
}
