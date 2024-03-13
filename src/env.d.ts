/**
 * We can extends the env types here
 * @see https://vitejs.dev/guide/env-and-mode.html#env-files
 */

type ImportMetaEnv = Readonly<Record<string, string>>;

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
