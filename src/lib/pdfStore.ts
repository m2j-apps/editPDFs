// In-memory store for passing PDF files from homepage to editor.
// Avoids sessionStorage size limits (~5-10MB) that break large file uploads.

let pendingFile: File | null = null;
let pendingExtraFiles: File[] = [];

export function setPendingPdf(file: File, extras: File[] = []) {
  pendingFile = file;
  pendingExtraFiles = extras;
}

export function getPendingPdf() {
  const file = pendingFile;
  const extras = pendingExtraFiles;
  pendingFile = null;
  pendingExtraFiles = [];
  return { file, extras };
}
