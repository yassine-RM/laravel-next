<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $articles = Article::where('author_id', $userId)->get();

        return response()->json($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Article::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userId = Auth::id();
        return Article::where('author_id', $userId)->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userId = Auth::id();

        $article = Article::where('id', $id)->where('author_id', $userId)->first();
    
        if (!$article) {
            return response()->json(['error' => 'Article not found or access denied'], 404);
        }

    
        $article->update($request->all());
    
        return response()->json(['message' => 'Article updated successfully', 'article' => $article], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userId = Auth::id(); 
    
        $article = Article::where('id', $id)->where('author_id', $userId)->first();
    
        if (!$article) {
            return response()->json(['error' => 'Article not found or access denied'], 404);
        }
    
        $article->delete();
    
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }
    
}
