import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function RecentComments() {
  const comments = [
    {
      id: 1,
      user: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "/avatars/01.png",
      fallback: "OM",
    },
    {
      id: 2,
      user: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/avatars/02.png",
      fallback: "JL",
    },
    {
      id: 3,
      user: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/avatars/03.png",
      fallback: "IN",
    },
    {
      id: 4,
      user: "William Kim",
      email: "will@email.com",
      avatar: "/avatars/04.png",
      fallback: "WK",
    },
    {
      id: 5,
      user: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "/avatars/05.png",
      fallback: "SD",
    },
  ];

  return (
    <div className="space-y-8">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={comment.avatar} alt={comment.user} />
            <AvatarFallback>{comment.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{comment.user}</p>
            <p className="text-sm text-muted-foreground">{comment.email}</p>
          </div>
          <button
            className="ml-auto px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            onClick={() => alert(`Répondre à ${comment.user}`)}
          >
            Répondre
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecentComments;
