import { defineConfig } from "tinacms";

// URL de base (à modifier en production)
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,

  // Token d'authentification TinaCMS (à configurer sur tina.io)
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images/blog",
      publicFolder: "public",
    },
  },

  // Définition du schéma des articles
  schema: {
    collections: [
      {
        name: "blog",
        label: "Articles du Blog",
        path: "content/blog",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug?.toLowerCase().replace(/ /g, "-") || "";
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre de l'article",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL de l'article (slug)",
            description: "L'URL sera : /blog/votre-slug - Utilisez des tirets, pas d'espaces ni d'accents",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Résumé (affiché dans la liste)",
            description: "2-3 phrases qui résument l'article",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Image de couverture",
            description: "Format recommandé : 1200x630px (ratio 1.91:1)",
          },
          {
            type: "string",
            name: "category",
            label: "Catégorie",
            options: [
              { value: "Nutrition", label: "Nutrition" },
              { value: "Conseils pratiques", label: "Conseils pratiques" },
              { value: "Bien-être", label: "Bien-être" },
              { value: "Recettes", label: "Recettes" },
              { value: "Santé", label: "Santé" },
            ],
            required: true,
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Date de publication",
            required: true,
          },
          {
            type: "string",
            name: "metaTitle",
            label: "Titre SEO",
            description: "Titre affiché dans Google (50-60 caractères recommandés)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Description SEO",
            description: "Description affichée dans Google (150-160 caractères recommandés)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Article mis en avant",
            description: "Afficher cet article en priorité sur la page d'accueil",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenu de l'article",
            isBody: true,
            templates: [
              {
                name: "callout",
                label: "Conseil / Info",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "conseil", "attention"],
                  },
                  {
                    name: "text",
                    label: "Texte",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
