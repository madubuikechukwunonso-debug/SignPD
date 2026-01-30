import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "signpd_db";
const STORE = "files";

let db: IDBPDatabase;

async function getDb() {
  if (!db)
    db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      },
    });
  return db;
}

/* ---------- generic helpers ---------- */
async function put(key: string, val: any) {
  const store = (await getDb()).transaction(STORE, "readwrite").objectStore(STORE);
  await store.put(JSON.stringify(val), key);
}

async function get(key: string) {
  const store = (await getDb()).transaction(STORE).objectStore(STORE);
  const raw = (await store.get(key)) as string | undefined;
  return raw ? JSON.parse(raw) : undefined;
}

/* ---------- PDF bytes ---------- */
export async function savePdfToIdb(bytes: Uint8Array) {
  await put("pdf", bytes);
}
export async function loadPdfFromIdb() {
  return (await get("pdf")) as Uint8Array | undefined;
}

/* ---------- layers ---------- */
export async function saveSignatures(sigs: any[])   { await put("signatures", sigs); }
export async function getSignatures()               { return (await get("signatures")) ?? []; }

export async function saveTextItems(items: any[])   { await put("textItems", items); }
export async function getTextItems()                { return (await get("textItems")) ?? []; }

export async function saveHighlights(h: any[])      { await put("highlights", h); }
export async function getHighlights()               { return (await get("highlights")) ?? []; }

export async function saveDrawings(d: any[])        { await put("drawings", d); }
export async function getDrawings()                 { return (await get("drawings")) ?? []; }

export async function saveStickyNotes(n: any[])     { await put("stickyNotes", n); }
export async function getStickyNotes()              { return (await get("stickyNotes")) ?? []; }

export async function saveStamps(s: any[])          { await put("stamps", s); }
export async function getStamps()                   { return (await get("stamps")) ?? []; }

export async function saveMeasures(m: any[])        { await put("measures", m); }
export async function getMeasures()                 { return (await get("measures")) ?? []; }

export async function saveImages(i: any[])          { await put("images", i); }
export async function getImages()                   { return (await get("images")) ?? []; }

/* ---------- page management ---------- */
export async function savePages(p: any[])           { await put("pages", p); }
export async function getPages()                    { return (await get("pages")) ?? []; }
