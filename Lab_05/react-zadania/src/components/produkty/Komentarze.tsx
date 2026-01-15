import { useEffect, useState } from "react";
import Komentarz from "./Komentarz";
import type { KomentarzProps } from "./Komentarz";


interface ApiResponse {
  comments: KomentarzProps[];
}

const Komentarze = () => {
  const [komentarze, setKomentarze] = useState<KomentarzProps[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setKomentarze(data.comments);
      });
  }, []);

  return (
    <div>
      <h2>Komentarze</h2>

      {komentarze.map((k) => (
        <Komentarz
          key={k.id}
          id={k.id}
          body={k.body}
          postId={k.postId}
          likes={k.likes}
          user={k.user}
        />
      ))}
    </div>
  );
};

export default Komentarze;
