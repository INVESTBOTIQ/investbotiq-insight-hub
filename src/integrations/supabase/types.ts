export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type User = {
  id: string;
  email?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
  aud?: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  invited_at?: string;
  action_link?: string;
  phone?: string;
  created_at?: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: any[];
  factors?: any[];
  [key: string]: any;
};

export type Session = {
  access_token: string;
  token_type: string;
  expires_in?: number;
  expires_at?: number;
  refresh_token?: string;
  user: User;
};

export type Database = {
  public: {
    Tables: Record<string, any>;
    Views: Record<string, any>;
    Functions: Record<string, any>;
    Enums: Record<string, any>;
    CompositeTypes: Record<string, any>;
  };
};
