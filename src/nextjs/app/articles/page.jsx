"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });
  const [editingArticle, setEditingArticle] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
        const token = localStorage.getItem("authToken");
        setToken(token)
        const response = await axios.get(API_URL+"/articles", {
            headers: { Authorization: `Bearer ${token}` },
          });
        setArticles(response.data);
    };
    fetchArticles();
  }, []);

  // Handle add or update article
  const handleSave = async (e) => {
    e.preventDefault();
    if (editingArticle) {
      await axios.put(API_URL+`/articles/${editingArticle.id}`, newArticle, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(API_URL+"/articles", newArticle, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setNewArticle({ title: "", content: "" });
    setEditingArticle(null);
    refreshArticles();
  };

  // Handle delete article
  const handleDelete = async (id) => {
    await axios.delete(API_URL+`/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    refreshArticles();
  };

  // Set article for editing
  const handleEdit = (article) => {
    setNewArticle({ title: article.title, content: article.content });
    setEditingArticle(article);
  };

  // Refresh article list after actions
  const refreshArticles = async () => {
    const response = await axios.get(API_URL+"/articles", {
        headers: { Authorization: `Bearer ${token}` },
      });
    setArticles(response.data);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      <form onSubmit={handleSave} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newArticle.title}
          onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="Content"
          value={newArticle.content}
          onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {editingArticle ? "Update Article" : "Add Article"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="border px-4 py-2">{article.id}</td>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
