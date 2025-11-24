"use client"
import { getCurrentUser } from "@/src/services/AuthService";
import CreatePost from "./createPost";
import { useEffect, useState } from "react";


const CreatePostWrapper = () => {
     const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  if (!currentUser) return <p>Loading...</p>;

    return <CreatePost currentUser={currentUser} />;
};

export default CreatePostWrapper;