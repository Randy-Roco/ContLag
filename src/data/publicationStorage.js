const STORAGE_KEY = 'cl2_publicaciones';

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error leyendo publicaciones desde localStorage:', error);
    return [];
  }
}

function writeStorage(publicaciones) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(publicaciones));
    return true;
  } catch (error) {
    console.error('Error guardando publicaciones en localStorage:', error);
    return false;
  }
}

export function getAllPublications() {
  return readStorage().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getLastPublication() {
  const publicaciones = readStorage();

  const ultima = publicaciones.find((item) => item.esUltima === true);
  if (ultima) return ultima;

  if (publicaciones.length === 0) return null;

  const ordenadas = [...publicaciones].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return ordenadas[0];
}

export function savePublication(newPublication) {
  const publicaciones = readStorage();

  const publicacionesActualizadas = publicaciones.map((item) => ({
    ...item,
    esUltima: false
  }));

  const publicationToSave = {
    ...newPublication,
    id: crypto.randomUUID(),
    esUltima: true,
    createdAt: new Date().toISOString()
  };

  publicacionesActualizadas.unshift(publicationToSave);

  const ok = writeStorage(publicacionesActualizadas);

  return {
    ok,
    publication: ok ? publicationToSave : null
  };
}

export function clearAllPublications() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error limpiando publicaciones:', error);
    return false;
  }
}

export function seedMockPublication(publication) {
  const existentes = readStorage();
  if (existentes.length > 0) {
    return { ok: true, skipped: true };
  }

  const publicationToSave = {
    ...publication,
    id: crypto.randomUUID(),
    esUltima: true,
    createdAt: new Date().toISOString()
  };

  const ok = writeStorage([publicationToSave]);

  return {
    ok,
    skipped: false,
    publication: ok ? publicationToSave : null
  };
}