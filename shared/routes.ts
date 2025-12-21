import { z } from 'zod';
import { insertUserSchema, insertLinkSchema, users, links } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(), // Returns User or 401
      },
    },
  },
  users: {
    get: {
      method: 'GET' as const,
      path: '/api/u/:username',
      responses: {
        200: z.custom<typeof users.$inferSelect & { links: typeof links.$inferSelect[] }>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/user', // Updates current user
      input: insertUserSchema.partial().extend({
        theme: z.string().optional(),
        accentColor: z.string().optional(),
        frame: z.string().optional(),
        glowEnabled: z.boolean().optional(),
        displayName: z.string().optional(),
        bio: z.string().optional(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
    addView: {
      method: 'POST' as const,
      path: '/api/u/:username/view',
      responses: {
        200: z.object({ views: z.number() }),
      },
    },
  },
  links: {
    create: {
      method: 'POST' as const,
      path: '/api/links',
      input: insertLinkSchema.omit({ userId: true }), // userId inferred from session
      responses: {
        201: z.custom<typeof links.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/links/:id',
      responses: {
        204: z.void(),
        401: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
