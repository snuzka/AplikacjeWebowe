import { useState } from "react";

export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarz = ({ body, likes, user }: KomentarzProps) => {
  const [liczbaLike, setLiczbaLike] = useState<number>(likes);

  return (
    <div style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
      <strong>{user.fullName}</strong> (@{user.username})
      <p>{body}</p>

      <div>
        <button onClick={() => setLiczbaLike((prev) => prev + 1)}>
          ^
        </button>

        <span style={{ margin: "0 10px" }}>
          {liczbaLike}
        </span>

        <button onClick={() => setLiczbaLike((prev) => prev - 1)}>
          v
        </button>
      </div>
    </div>
  );
};

export default Komentarz;
