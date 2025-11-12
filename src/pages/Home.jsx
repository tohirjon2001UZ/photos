import { useEffect, useState } from "react";
import {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../api/api";
import AlbumForm from "../components/AlbumForm";
import AlbumList from "../components/AlbumList";

export default function Home() {
  const [albums, setAlbums] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      
      try {
        const saved = localStorage.getItem("albums");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAlbums(parsed);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Hatolik yuz berdi!", e);
      }
      
      try {
        const data = await getAlbums(10);
        setAlbums(data);
        try {
          localStorage.setItem("albums", JSON.stringify(data));
        } catch (e) {
          console.warn("Hatolik yuz berdi!", e);
        }
      } catch (e) {
        console.error("Hatolik yuz berdi!", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const handleSave = async (form) => {
    if (editData) {
      const updated = await updateAlbum(editData.id, form);
      setAlbums((prev) => {
        const next = prev.map((a) => (a.id === editData.id ? updated : a));
        try {
          localStorage.setItem("albums", JSON.stringify(next));
        } catch (e) {
          console.warn("Hatolik yuz berdi!", e);
        }
        return next;
      });
      setEditData(null);
    } else {
      const newAlbum = await createAlbum(form);
      setAlbums((prev) => {
        const next = [newAlbum, ...prev];
        try {
          localStorage.setItem("albums", JSON.stringify(next));
        } catch (e) {
          console.warn("Hatolik yuz berdi!", e);
        }
        return next;
      });
    }
  };

  const handleEdit = (album) => setEditData(album);

  const handleDelete = async (id) => {
    await deleteAlbum(id);
    setAlbums((prev) => {
      const next = prev.filter((a) => a.id !== id);
      try {
        if (next.length > 0) {
          localStorage.setItem("albums", JSON.stringify(next));
        } else {
          localStorage.removeItem("albums");
        }
      } catch (e) {
        console.warn("Hatolik yuz berdi!", e);
      }
      return next;
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">��� Album Manager</h1>
      <AlbumForm onSave={handleSave} editData={editData} />
      <AlbumList albums={albums} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
