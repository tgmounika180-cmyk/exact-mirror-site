export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      homepage_hero: {
        Row: {
          background_image_key: string
          badge: string
          created_at: string
          cta1_href: string
          cta1_label: string
          cta2_href: string
          cta2_label: string
          headline: string
          id: string
          subheadline: string
          updated_at: string
        }
        Insert: {
          background_image_key?: string
          badge?: string
          created_at?: string
          cta1_href?: string
          cta1_label?: string
          cta2_href?: string
          cta2_label?: string
          headline?: string
          id?: string
          subheadline?: string
          updated_at?: string
        }
        Update: {
          background_image_key?: string
          badge?: string
          created_at?: string
          cta1_href?: string
          cta1_label?: string
          cta2_href?: string
          cta2_label?: string
          headline?: string
          id?: string
          subheadline?: string
          updated_at?: string
        }
        Relationships: []
      }
      homepage_institutions: {
        Row: {
          created_at: string
          description: string
          href: string
          id: string
          image_key: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          href?: string
          id?: string
          image_key: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          href?: string
          id?: string
          image_key?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      homepage_partners: {
        Row: {
          created_at: string
          id: string
          image_key: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_key: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_key?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      homepage_posts: {
        Row: {
          created_at: string
          date_text: string
          excerpt: string
          href: string
          id: string
          image_key: string
          sort_order: number
          title: string
          type: Database["public"]["Enums"]["homepage_post_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_text?: string
          excerpt?: string
          href?: string
          id?: string
          image_key: string
          sort_order?: number
          title: string
          type: Database["public"]["Enums"]["homepage_post_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_text?: string
          excerpt?: string
          href?: string
          id?: string
          image_key?: string
          sort_order?: number
          title?: string
          type?: Database["public"]["Enums"]["homepage_post_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_footer_links: {
        Row: {
          created_at: string
          key: string
          label: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          key: string
          label?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          key?: string
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_nav_labels: {
        Row: {
          created_at: string
          key: string
          label: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          key: string
          label?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          key?: string
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_text: string
          contact_address: string
          contact_email: string
          contact_phone: string
          created_at: string
          footer_description: string
          id: string
          topbar_email: string
          topbar_phone: string
          updated_at: string
        }
        Insert: {
          about_text?: string
          contact_address?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string
          footer_description?: string
          id?: string
          topbar_email?: string
          topbar_phone?: string
          updated_at?: string
        }
        Update: {
          about_text?: string
          contact_address?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string
          footer_description?: string
          id?: string
          topbar_email?: string
          topbar_phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_content: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      homepage_post_type: "news" | "buzz"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      homepage_post_type: ["news", "buzz"],
    },
  },
} as const
