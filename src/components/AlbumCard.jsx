import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

export default function AlbumCard({ album, onEdit, onDelete }) {
  return (
    <Card className="w-[250px] rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">{album.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="rounded-xl mb-2 w-[150px] h-[150px] bg-gray-300 flex items-center justify-center text-gray-600 overflow-hidden">
          <img
            src={album.url || album.thumbnailUrl}
            alt={album.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.textContent = `📷 ${album.id}`;
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onEdit(album)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(album.id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
