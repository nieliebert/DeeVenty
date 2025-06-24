# Eleventy Site with Tailwind CSS and Decap CMS

A modern static site built with Eleventy, styled with Tailwind CSS, and managed with Decap CMS.

## Features

- Static site generation with [Eleventy](https://www.11ty.dev/)
- Responsive design with [Tailwind CSS](https://tailwindcss.com/)
- Content management with [Decap CMS](https://decapcms.org/)
- Blog support with tags and categories
- Markdown content with syntax highlighting
- Responsive navigation
- Modern development workflow

## Getting Started

1. Clone this repository:
```bash
git clone <your-repo-url>
cd eleventy-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Setting up Decap CMS

1. Deploy your site to Netlify
2. Enable Netlify Identity
3. Enable Git Gateway
4. Invite users to manage content
5. Access the admin panel at `/admin`

## Project Structure

```
.
├── src/
│   ├── _data/          # Site data
│   ├── _includes/      # Reusable components
│   ├── _layouts/       # Base layouts
│   ├── admin/          # Decap CMS admin files
│   ├── blog/           # Blog posts
│   ├── css/           # Tailwind CSS files
│   └── pages/         # Static pages
├── .eleventy.js       # Eleventy config
├── package.json
├── README.md
└── tailwind.config.js # Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 