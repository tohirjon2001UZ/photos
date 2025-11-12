import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AlbumForm({ onSave, editData }) {
  const [form, setForm] = useState({ title: "", url: "", thumbnailUrl: "" });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.url || !form.thumbnailUrl)
      return alert("All fields required!");
    onSave(form);
    setForm({ title: "", url: "", thumbnailUrl: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 flex-wrap items-center justify-center mb-6"
    >
        
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-[250px]"
      />
      <Input
        placeholder="Image URL"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
        className="w-[250px]"
      />
      <Input
        placeholder="Thumbnail URL"
        value={form.thumbnailUrl}
        onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
        className="w-[250px]"
      />
      <Button type="submit">{editData ? "Update" : "Add"}</Button>
    </form>
  );
}
