---
layout: base.njk
title: Projects
---

<div class="mb-8">
  <h1 class="text-3xl sm:text-4xl font-bold">My Projects</h1>
  <br>
  <p>
   Berikut adalah kumpulan proyek-proyek yang telah saya kerjakan, baik proyek pribadi maupun profesional.
  </p>
</div>


<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
{% for project in collections.projects %}
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    {% if project.data.image %}
    <a href="{{ project.url }}" class="block aspect-video overflow-hidden">
      <img src="{{ project.data.image }}" alt="{{ project.data.title }}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
    </a>
    {% endif %}
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">
        <a href="{{ project.url }}" class="hover:text-blue-600 dark:hover:text-blue-400">
          {{ project.data.title }}
        </a>
      </h2>
      {% if project.data.description %}
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{{ project.data.description }}</p>
      {% endif %}
      
      {% if project.data.tech %}
      <div class="flex flex-wrap gap-2 mt-3">
        {% for tag in project.data.tech %}
        <span class="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full text-xs">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div> 