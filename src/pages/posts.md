---
layout: base.njk
title: All Posts
---

<div class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold">All Posts</h1>
    <div class="relative">
        <form class="relative" id="searchForm">
            <input type="search" 
                   id="searchInput"
                   placeholder="Search posts..." 
                   class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400 focus:outline-none"
            >
            <button type="submit" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </form>
    </div>
</div>

<div id="postsList">
    {% set posts = collections.posts | reverse %}
    {% for post in posts %}
    <article class="pl-5 mb-8 border-l-4 border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-colors">
        <h2 class="text-2xl font-bold mb-2">
            <a href="{{ post.url }}" class="hover:text-blue-500">
                {{ post.data.title }}
            </a>
        </h2>
        <time class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
            {{ post.date | date("d MMMM yyyy") }}
        </time>
        {% if post.data.tags %}
        <div class="flex flex-wrap gap-2 mb-2">
            {% for tag in post.data.tags %}
            {% if tag != "posts" %}
            <a href="/tags/{{ tag }}" class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {{ tag }}
            </a>
            {% endif %}
            {% endfor %}
        </div>
        {% endif %}
        {% if post.data.description %}
        <p class="text-gray-600 dark:text-gray-400">
            {{ post.data.description }}
        </p>
        {% endif %}
    </article>
    {% endfor %}
</div> 