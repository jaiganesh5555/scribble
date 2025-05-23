import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
  "content": string;
  "title": string;
  "id": number
  "author": {
    "name": string
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        setBlog(response.data.post);
        setLoading(false);
      })
  }, [id])

  return {
    loading,
    blog
  }

}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  console.log(localStorage.getItem("token"))

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log("Blog response:", response.data);
        // The backend returns the array directly, not wrapped in a 'posts' object
        setBlogs(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, [])

  return {
    loading,
    blogs
  }
}
