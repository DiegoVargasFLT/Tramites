export type EstadoTramite = 'Pendiente' | 'En Trámite' | 'Cumplido' | 'Vencido';

export interface Perfil {
  id: string;
  nombre_completo: string;
}

export interface Entidad {
  id: string;
  entidad: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  descripcion?: string;
}

export interface TramiteProyecto {
  proyectos: Proyecto;
}

export interface Tramite {
  id: string;
  nombre: string;
  fecha_radicacion: string;
  fecha_estimada: string;
  responsable_id: string;
  entidad_id: string;
  observacion: string;
  estado: EstadoTramite;
  perfiles?: Perfil;
  entidades?: Entidad;
  tramites_proyectos?: TramiteProyecto[];
}

export interface IndicadorResponsable {
  responsable: string;
  estado: EstadoTramite;
  cantidad_tramites: number;
}

export interface IndicadorEntidad {
  entidad: string;
  estado: EstadoTramite;
  cantidad_tramites: number;
}
