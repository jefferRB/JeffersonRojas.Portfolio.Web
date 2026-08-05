import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  LUXURYCLOUD_SCREENSHOTS,
  OPEN_GRAPH_SCREENSHOT,
  PROJECT_GALLERIES,
} from './screenshots.config';
import { RESUME_CONFIG } from './site.config';

/**
 * These assertions run against the real `public/` directory, so a config entry
 * that points at a file nobody committed fails here rather than 404ing in
 * production. The runner's working directory is the project root.
 */
const PUBLIC_DIR = resolve(process.cwd(), 'public');

function publicPath(assetPath: string): string {
  return join(PUBLIC_DIR, assetPath.replace(/^\//, ''));
}

describe('public assets', () => {
  describe('résumé', () => {
    it('exists at the configured path', () => {
      expect(existsSync(publicPath(RESUME_CONFIG.path))).toBe(true);
    });

    it('is a non-empty PDF', () => {
      const file = publicPath(RESUME_CONFIG.path);

      expect(RESUME_CONFIG.path.endsWith('.pdf')).toBe(true);
      expect(statSync(file).size).toBeGreaterThan(10_000);
    });

    it('is the only résumé in the public directory', () => {
      const documents = join(PUBLIC_DIR, 'documents');
      const pdfs = existsSync(documents)
        ? readdirSync(documents).filter((name) => name.toLowerCase().endsWith('.pdf'))
        : [];

      // A stale copy left behind is a link waiting to serve the wrong version.
      expect(pdfs.length).toBe(1);
    });

    it('is not named after any single employer', () => {
      const documents = join(PUBLIC_DIR, 'documents');
      const names = existsSync(documents) ? readdirSync(documents) : [];

      for (const name of names) {
        expect(name.toLowerCase()).not.toMatch(/terumo|catalina/);
      }
    });

    it('is marked available, since the file is committed', () => {
      expect(RESUME_CONFIG.available).toBe(true);
    });
  });

  describe('screenshots', () => {
    const galleries = Object.entries(PROJECT_GALLERIES);
    const entries = galleries.flatMap(([, gallery]) => gallery);

    it('declares intrinsic dimensions for every entry', () => {
      for (const shot of entries) {
        expect(shot.width, shot.id).toBeGreaterThan(0);
        expect(shot.height, shot.id).toBeGreaterThan(0);
      }
    });

    it('names each file after the id it is keyed by', () => {
      for (const shot of entries) {
        expect(shot.src.endsWith(`/${shot.id}.webp`), shot.id).toBe(true);
      }
    });

    it('keeps every id unique across projects', () => {
      // The dictionaries key captions by id alone, so a collision would make
      // one project silently describe another's capture.
      const ids = entries.map((shot) => shot.id);

      expect(new Set(ids).size).toBe(ids.length);
    });

    it('files each project under its own image folder', () => {
      for (const [project, gallery] of galleries) {
        for (const shot of gallery) {
          expect(shot.src.startsWith(`/images/projects/${project}/`), shot.id).toBe(true);
        }
      }
    });

    it('only marks a screenshot available when the file is actually committed', () => {
      for (const shot of entries) {
        if (shot.available) {
          expect(existsSync(publicPath(shot.src)), `${shot.id} is marked available`).toBe(true);
        }
      }
    });

    it('publishes every LuxuryCloud capture', () => {
      expect(LUXURYCLOUD_SCREENSHOTS.every((shot) => shot.available)).toBe(true);
      expect(LUXURYCLOUD_SCREENSHOTS.length).toBe(10);
    });

    it('leaves no orphan file behind in a project folder', () => {
      for (const [project, gallery] of galleries) {
        const folder = join(PUBLIC_DIR, 'images', 'projects', project);
        const onDisk = existsSync(folder) ? readdirSync(folder) : [];
        const declared = new Set(
          gallery.filter((shot) => shot.available).map((shot) => `${shot.id}.webp`),
        );

        // A capture nothing points at is a file that will be deployed forever.
        for (const file of onDisk) {
          expect(declared.has(file), `${project}/${file} is not referenced`).toBe(true);
        }
      }
    });

    it('nominates the public business page for og:image', () => {
      // It is the only capture with no internal data on it.
      expect(OPEN_GRAPH_SCREENSHOT).toBe('public-site');
    });
  });
});
