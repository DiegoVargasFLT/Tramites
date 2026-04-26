export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      entidades: {
        Row: {
          creado_en: string | null;
          entidad: string | null;
          id: string;
        };
        Insert: {
          creado_en?: string | null;
          entidad?: string | null;
          id?: string;
        };
        Update: {
          creado_en?: string | null;
          entidad?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      perfiles: {
        Row: {
          creado_en: string | null;
          email: string | null;
          id: string;
          nombre_completo: string | null;
        };
        Insert: {
          creado_en?: string | null;
          email?: string | null;
          id?: string;
          nombre_completo?: string | null;
        };
        Update: {
          creado_en?: string | null;
          email?: string | null;
          id?: string;
          nombre_completo?: string | null;
        };
        Relationships: [];
      };
      proyectos: {
        Row: {
          creado_en: string | null;
          descripcion: string | null;
          id: string;
          nombre: string;
        };
        Insert: {
          creado_en?: string | null;
          descripcion?: string | null;
          id?: string;
          nombre?: string;
        };
        Update: {
          creado_en?: string | null;
          descripcion?: string | null;
          id?: string;
          nombre?: string;
        };
        Relationships: [];
      };
      tramites: {
        Row: {
          actualizado_en: string | null;
          creado_en: string | null;
          entidad_id: string | null;
          estado: Database["public"]["Enums"]["estado_tramite"] | null;
          fecha_estimada: string | null;
          fecha_radicacion: string;
          id: string;
          nombre: string;
          observacion: string | null;
          responsable_id: string | null;
          proyectos: string[] | null;
        };
        Insert: {
          actualizado_en?: string | null;
          creado_en?: string | null;
          entidad_id?: string | null;
          estado?: Database["public"]["Enums"]["estado_tramite"] | null;
          fecha_estimada?: string | null;
          fecha_radicacion: string;
          id?: string;
          nombre: string;
          observacion?: string | null;
          responsable_id?: string | null;
          proyectos?: string[] | null;
        };
        Update: {
          actualizado_en?: string | null;
          creado_en?: string | null;
          entidad_id?: string | null;
          estado?: Database["public"]["Enums"]["estado_tramite"] | null;
          fecha_estimada?: string | null;
          fecha_radicacion?: string;
          id?: string;
          nombre?: string;
          observacion?: string | null;
          responsable_id?: string | null;
          proyectos?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "tramites_entidad_id_fkey";
            columns: ["entidad_id"];
            isOneToOne: false;
            referencedRelation: "entidades";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tramites_responsable_id_fkey";
            columns: ["responsable_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      tramites_proyectos: {
        Row: {
          creado_en: string | null;
          id: string;
          proyecto_id: string;
          tramite_id: string;
        };
        Insert: {
          creado_en?: string | null;
          id?: string;
          proyecto_id: string;
          tramite_id: string;
        };
        Update: {
          creado_en?: string | null;
          id?: string;
          proyecto_id?: string;
          tramite_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tramites_proyectos_proyecto_id_fkey";
            columns: ["proyecto_id"];
            isOneToOne: false;
            referencedRelation: "proyectos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tramites_proyectos_tramite_id_fkey";
            columns: ["tramite_id"];
            isOneToOne: false;
            referencedRelation: "tramites";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      vista_indicadores: {
        Row: {
          cantidad_tramites: number | null;
          estado: Database["public"]["Enums"]["estado_tramite"] | null;
          responsable: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      estado_tramite: "Pendiente" | "En Trámite" | "Cumplido" | "Vencido";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      entidades: {
        Row: {
          creado_en: string | null;
          entidad: string | null;
          id: string;
        };
        Insert: {
          creado_en?: string | null;
          entidad?: string | null;
          id?: string;
        };
        Update: {
          creado_en?: string | null;
          entidad?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      perfiles: {
        Row: {
          creado_en: string | null;
          email: string | null;
          id: string;
          nombre_completo: string | null;
        };
        Insert: {
          creado_en?: string | null;
          email?: string | null;
          id?: string;
          nombre_completo?: string | null;
        };
        Update: {
          creado_en?: string | null;
          email?: string | null;
          id?: string;
          nombre_completo?: string | null;
        };
        Relationships: [];
      };
      proyectos: {
        Row: {
          creado_en: string | null;
          descripcion: string | null;
          id: string;
          nombre: string;
        };
        Insert: {
          creado_en?: string | null;
          descripcion?: string | null;
          id?: string;
          nombre?: string;
        };
        Update: {
          creado_en?: string | null;
          descripcion?: string | null;
          id?: string;
          nombre?: string;
        };
        Relationships: [];
      };
      tramites: {
        Row: {
          actualizado_en: string | null;
          creado_en: string | null;
          entidad_id: string | null;
          estado: Database["public"]["Enums"]["estado_tramite"] | null;
          fecha_estimada: string | null;
          fecha_radicacion: string;
          id: string;
          nombre: string;
          observacion: string | null;
          responsable_id: string | null;
          proyectos: string[] | null;
        };
        Insert: {
          actualizado_en?: string | null;
          creado_en?: string | null;
          entidad_id?: string | null;
          estado?: Database["public"]["Enums"]["estado_tramite"] | null;
          fecha_estimada?: string | null;
          fecha_radicacion: string;
          id?: string;
          nombre: string;
          observacion?: string | null;
          responsable_id?: string | null;
          proyectos?: string[] | null;
        };
        Update: {
          actualizado_en?: string | null;
          creado_en?: string | null;
          entidad_id?: string | null;
          estado?: Database["public"]["Enums"]["estado_tramite"] | null;
          fecha_estimada?: string | null;
          fecha_radicacion?: string;
          id?: string;
          nombre?: string;
          observacion?: string | null;
          responsable_id?: string | null;
          proyectos?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "tramites_entidad_id_fkey";
            columns: ["entidad_id"];
            isOneToOne: false;
            referencedRelation: "entidades";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tramites_responsable_id_fkey";
            columns: ["responsable_id"];
            isOneToOne: false;
            referencedRelation: "perfiles";
            referencedColumns: ["id"];
          },
        ];
      };
      tramites_proyectos: {
        Row: {
          creado_en: string | null;
          id: string;
          proyecto_id: string;
          tramite_id: string;
        };
        Insert: {
          creado_en?: string | null;
          id?: string;
          proyecto_id: string;
          tramite_id: string;
        };
        Update: {
          creado_en?: string | null;
          id?: string;
          proyecto_id?: string;
          tramite_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tramites_proyectos_proyecto_id_fkey";
            columns: ["proyecto_id"];
            isOneToOne: false;
            referencedRelation: "proyectos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tramites_proyectos_tramite_id_fkey";
            columns: ["tramite_id"];
            isOneToOne: false;
            referencedRelation: "tramites";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      vista_indicadores: {
        Row: {
          cantidad_tramites: number | null;
          estado: Database["public"]["Enums"]["estado_tramite"] | null;
          responsable: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      estado_tramite: "Pendiente" | "En Trámite" | "Cumplido" | "Vencido";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
typeDatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">>;



export const Constants = {
  public: {
    Enums: {
      estado_tramite: ["Pendiente", "En Trámite", "Cumplido", "Vencido"],
    },
  },
} as const