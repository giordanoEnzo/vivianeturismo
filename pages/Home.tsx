import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Packages } from '../components/Packages';
import { Services } from '../components/Services';
import { ContactFooter } from '../components/ContactFooter';

export function Home() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <main>
                <Hero />
                <Packages />
                <Services />
            </main>
            <ContactFooter />
        </div>
    );
}
