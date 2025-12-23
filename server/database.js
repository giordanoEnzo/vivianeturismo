import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
    return open({
        filename: './server/database.db',
        driver: sqlite3.Database
    });
}

export async function setupDb() {
    const db = await openDb();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price TEXT,
      duration TEXT,
      image TEXT,
      hotel TEXT,
      has_breakfast BOOLEAN,
      has_lunch BOOLEAN,
      has_dinner BOOLEAN,
      flight_info TEXT,
      services_info TEXT,
      people_count TEXT,
      active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

    // Migrate existing tables if needed (simplistic migration)
    try {
        await db.exec(`ALTER TABLE promotions ADD COLUMN hotel TEXT`);
    } catch (e) { }
    try {
        await db.exec(`ALTER TABLE promotions ADD COLUMN has_breakfast BOOLEAN`);
    } catch (e) { }
    try {
        await db.exec(`ALTER TABLE promotions ADD COLUMN has_lunch BOOLEAN`);
    } catch (e) { }
    try {
        await db.exec(`ALTER TABLE promotions ADD COLUMN has_dinner BOOLEAN`);
    } catch (e) { }
    try {
        await db.exec(`ALTER TABLE promotions ADD COLUMN flight_info TEXT`);
    } catch (e) { }
    try {
        await db.exec(`ALTER TABLE promotions ADD COLUMN services_info TEXT`);
    } catch (e) { }
    try {
        await db.exec(`ALTER TABLE promotions ADD COLUMN people_count TEXT`);
    } catch (e) { }

    // Seed data if empty (Check if empty first)
    const count = await db.get('SELECT count(*) as count FROM promotions');
    if (count && count.count === 0) {
        console.log('Seeding promotions...');
        await db.run(`INSERT INTO promotions (title, description, price, duration, image, hotel, has_breakfast, flight_info, services_info, people_count) VALUES 
    ('Maldívas', 'Relaxe em bangalôs sobre as águas cristalinas com tudo incluso.', 'R$ 12.500', '7 Dias', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Resort 5 Estrelas', 1, 'Voo Direto SP - Malé', 'Transfer de Lancha incluso', '2 Pessoas'),
    ('Paris, França', 'Viva o romance na cidade luz, com passeios na Torre Eiffel e Louvre.', 'R$ 8.900', '5 Dias', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Hotel Plaza', 1, 'Voo com escala em Lisboa', 'City Tour incluso', '1 Pessoa')
    `);
    }

    return db;
}
