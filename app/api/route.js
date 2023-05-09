import fs from 'fs';
import csv from 'csv-parser';
import { NextResponse } from 'next/server';

function loadWordsCSV() {
  return new Promise((resolve) => {
    const rows = [];
    fs.createReadStream('./public/words.csv')
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', () => {
        resolve(rows);
      });
  });
}
 
export async function GET() {
  const words = await loadWordsCSV();
  const pick = words[Math.floor(Math.random() * words.length)];

  return NextResponse.json(pick,
    {
      status: 200,
      headers: {
        'Cache-Control': 'private, s-maxage=1, stale-while-revalidate, max-age=0, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      },
    },
  );
}
