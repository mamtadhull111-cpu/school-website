import { useState, useCallback } from "react";

const STORAGE_KEY = "gvps_teacher_photos";

function loadPhotos(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function savePhotos(photos: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

export function useTeacherPhotos() {
  const [photos, setPhotos] = useState<Record<string, string>>(loadPhotos);

  const setPhoto = useCallback((teacherName: string, dataUrl: string) => {
    setPhotos((prev) => {
      const next = { ...prev, [teacherName]: dataUrl };
      savePhotos(next);
      return next;
    });
  }, []);

  const removePhoto = useCallback((teacherName: string) => {
    setPhotos((prev) => {
      const next = { ...prev };
      delete next[teacherName];
      savePhotos(next);
      return next;
    });
  }, []);

  return { photos, setPhoto, removePhoto };
}
