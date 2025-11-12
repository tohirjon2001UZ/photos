import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import AlbumCard from "./AlbumCard";

export default function AlbumList({ albums, onEdit, onDelete }) {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {albums.map((album) => (
        <DraggableCardBody key={album.id}>
          <DraggableCardContainer>
            <AlbumCard album={album} onEdit={onEdit} onDelete={onDelete} />
          </DraggableCardContainer>
        </DraggableCardBody>
      ))}
    </div>
  );
}
