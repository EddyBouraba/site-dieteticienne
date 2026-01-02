import { defineConfig } from "tinacms";

const branch = process.env.TINA_BRANCH || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

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
  schema: {
    collections: [
      {
        name: "post",
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
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Extrait",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Image de couverture",
          },
          {
            type: "string",
            name: "category",
            label: "Catégorie",
            options: [
              "Conseils pratiques",
              "Nutrition",
              "Recettes",
              "Santé",
              "Bien-être",
            ],
          },
          {
            type: "string",
            name: "author",
            label: "Auteur",
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
            label: "Meta Title (SEO)",
          },
          {
            type: "string",
            name: "metaDescription",
            label: "Meta Description (SEO)",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Article mis en avant",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenu",
            isBody: true,
          },
        ],
      },
    ],
  },
});
