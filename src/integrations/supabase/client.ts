import type { User, Session } from './types';

export type { User, Session };

class SupabaseQueryBuilder {
  private _table: string;

  constructor(table: string) {
    this._table = table;
  }

  select(..._args: any[]) { return this; }
  insert(..._args: any[]) { return Promise.resolve({ data: null, error: null }); }
  update(..._args: any[]) { return Promise.resolve({ data: null, error: null }); }
  delete(..._args: any[]) { return Promise.resolve({ data: null, error: null }); }
  eq(..._args: any[]) { return this; }
  order(..._args: any[]) { return this; }
  limit(..._args: any[]) { return this; }
  single() { return Promise.resolve({ data: null, error: null }); }
  maybeSingle() { return Promise.resolve({ data: null, error: null }); }
  then(resolve: any) { return resolve({ data: [], error: null }); }
}

export const supabase = {
  auth: {
    signUp: async (..._args: any[]) => ({ data: { user: null, session: null }, error: null }),
    signInWithPassword: async (..._args: any[]) => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    updateUser: async (..._args: any[]) => ({ data: { user: null }, error: null }),
    onAuthStateChange: (_callback: any) => ({
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    }),
  },
  from: (table: string) => new SupabaseQueryBuilder(table),
};
