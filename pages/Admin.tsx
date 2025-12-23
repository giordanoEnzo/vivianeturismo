import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Image as ImageIcon, LogOut } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export function Admin() {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    const [activeTab, setActiveTab] = useState('promotions');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem('adminToken', res.data.token);
            }
        } catch (err) {
            alert('Login falhou');
        }
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('adminToken');
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Usuário</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center font-bold text-xl text-blue-600">
                                Viviane Turismo - Admin
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <button
                                    onClick={() => setActiveTab('promotions')}
                                    className={`${activeTab === 'promotions'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Promoções
                                </button>
                                <button
                                    onClick={() => setActiveTab('blog')}
                                    className={`${activeTab === 'blog'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Blog
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-full text-gray-400 hover:text-gray-500"
                            >
                                <LogOut className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {activeTab === 'promotions' ? <PromotionsManager /> : <BlogManager />}
            </div>
        </div>
    );
}

function PromotionsManager() {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [newPromo, setNewPromo] = useState({
        title: '',
        description: '',
        price: '',
        duration: '',
        hotel: '',
        has_breakfast: false,
        has_lunch: false,
        has_dinner: false,
        flight_info: '',
        services_info: '',
        people_count: '',
        image: null as File | null
    });

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const res = await axios.get(`${API_URL}/promotions`);
            setPromotions(res.data);
        } catch (error) {
            console.error('Error fetching promotions', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Tem certeza?')) {
            await axios.delete(`${API_URL}/promotions/${id}`);
            fetchPromotions();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newPromo.title);
        formData.append('description', newPromo.description);
        formData.append('price', newPromo.price);
        formData.append('duration', newPromo.duration);
        formData.append('hotel', newPromo.hotel);
        formData.append('has_breakfast', String(newPromo.has_breakfast));
        formData.append('has_lunch', String(newPromo.has_lunch));
        formData.append('has_dinner', String(newPromo.has_dinner));
        formData.append('flight_info', newPromo.flight_info);
        formData.append('services_info', newPromo.services_info);
        formData.append('people_count', newPromo.people_count);

        if (newPromo.image) {
            formData.append('image', newPromo.image);
        }

        try {
            await axios.post(`${API_URL}/promotions`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setNewPromo({
                title: '',
                description: '',
                price: '',
                duration: '',
                hotel: '',
                has_breakfast: false,
                has_lunch: false,
                has_dinner: false,
                flight_info: '',
                services_info: '',
                people_count: '',
                image: null // Removed 'as File | null' since it's just the value here
            });
            fetchPromotions();
        } catch (error) {
            console.error('Error creating promotion', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Nova Promoção</h3>
                        <p className="mt-1 text-sm text-gray-500">Cadastre um novo pacote de viagem para aparecer na home.</p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Destino (Título)</label>
                                    <input
                                        type="text"
                                        required
                                        value={newPromo.title}
                                        onChange={(e) => setNewPromo({ ...newPromo, title: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Preço</label>
                                    <input
                                        type="text"
                                        required
                                        value={newPromo.price}
                                        onChange={(e) => setNewPromo({ ...newPromo, price: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Duração</label>
                                    <input
                                        type="text"
                                        required
                                        value={newPromo.duration}
                                        onChange={(e) => setNewPromo({ ...newPromo, duration: e.target.value })}
                                        placeholder="Ex: 7 Dias"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Hotel</label>
                                    <input
                                        type="text"
                                        value={newPromo.hotel}
                                        onChange={(e) => setNewPromo({ ...newPromo, hotel: e.target.value })}
                                        placeholder="Nome do Hotel"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Refeições Inclusas</label>
                                    <div className="flex space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                id="breakfast"
                                                name="breakfast"
                                                type="checkbox"
                                                checked={newPromo.has_breakfast}
                                                onChange={(e) => setNewPromo({ ...newPromo, has_breakfast: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="breakfast" className="ml-2 block text-sm text-gray-900">
                                                Café da Manhã
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="lunch"
                                                name="lunch"
                                                type="checkbox"
                                                checked={newPromo.has_lunch}
                                                onChange={(e) => setNewPromo({ ...newPromo, has_lunch: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="lunch" className="ml-2 block text-sm text-gray-900">
                                                Almoço
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="dinner"
                                                name="dinner"
                                                type="checkbox"
                                                checked={newPromo.has_dinner}
                                                onChange={(e) => setNewPromo({ ...newPromo, has_dinner: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="dinner" className="ml-2 block text-sm text-gray-900">
                                                Jantar
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Informações do Aéreo</label>
                                    <input
                                        type="text"
                                        value={newPromo.flight_info}
                                        onChange={(e) => setNewPromo({ ...newPromo, flight_info: e.target.value })}
                                        placeholder="Cia Aérea, Horários, etc."
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Informações de Serviços</label>
                                    <input
                                        type="text"
                                        value={newPromo.services_info}
                                        onChange={(e) => setNewPromo({ ...newPromo, services_info: e.target.value })}
                                        placeholder="Passeios, Transfers, etc."
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Quantidade de Pessoas</label>
                                    <input
                                        type="text"
                                        value={newPromo.people_count}
                                        onChange={(e) => setNewPromo({ ...newPromo, people_count: e.target.value })}
                                        placeholder="Ex: 2 Pessoas"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                                    <textarea
                                        rows={3}
                                        value={newPromo.description}
                                        onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Imagem</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewPromo({ ...newPromo, image: e.target.files ? e.target.files[0] : null })}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Promoções Ativas</h3>
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {promotions.map((promo) => (
                            <div key={promo.id} className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200">
                                <div className="flex-shrink-0 h-48 bg-gray-200">
                                    {promo.image ? (
                                        <img className="h-48 w-full object-cover" src={`http://localhost:3001${promo.image}`} alt={promo.title} />
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon className="h-12 w-12" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-indigo-600">
                                            {promo.price}
                                        </p>
                                        <div className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">{promo.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{promo.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-end">
                                        <button
                                            onClick={() => handleDelete(promo.id)}
                                            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

function BlogManager() {
    const [posts, setPosts] = useState<any[]>([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', image: null as File | null });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API_URL}/posts`);
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Tem certeza?')) {
            await axios.delete(`${API_URL}/posts/${id}`);
            fetchPosts();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('content', newPost.content);
        if (newPost.image) {
            formData.append('image', newPost.image);
        }

        try {
            await axios.post(`${API_URL}/posts`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setNewPost({ title: '', content: '', image: null });
            fetchPosts();
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Novo Post</h3>
                        <p className="mt-1 text-sm text-gray-500">Escreva um novo artigo para o blog.</p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Título</label>
                                    <input
                                        type="text"
                                        required
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
                                    <textarea
                                        rows={6}
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Imagem de Capa</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewPost({ ...newPost, image: e.target.files ? e.target.files[0] : null })}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Artigos Publicados</h3>
                    <div className="mt-5 space-y-4">
                        {posts.map((post) => (
                            <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded overflow-hidden">
                                    {post.image ? (
                                        <img className="h-16 w-16 object-cover" src={`http://localhost:3001${post.image}`} alt={post.title} />
                                    ) : (
                                        <ImageIcon className="h-8 w-8 m-4 text-gray-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {post.title}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        {post.content}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
