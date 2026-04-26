-- Crear tabla de proyectos
CREATE TABLE IF NOT EXISTS proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de relación tramites_proyectos (muchos a muchos)
CREATE TABLE IF NOT EXISTS tramites_proyectos (
  tramite_id UUID NOT NULL REFERENCES tramites(id) ON DELETE CASCADE,
  proyecto_id UUID NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (tramite_id, proyecto_id)
);

-- Insertar los 15 proyectos base
INSERT INTO proyectos (nombre) VALUES
  ('Av. Guaymaral Oriental'),
  ('Av. Polo Occidental'),
  ('Av. Santa Barbara'),
  ('EBAR'),
  ('Humedal Torca - Guaymaral'),
  ('Lagos de Torca'),
  ('Polo Oriental'),
  ('Quebrada Aguas Calientes'),
  ('Quebrada Patiño'),
  ('Quebrada San Juan'),
  ('UF1'),
  ('UF2A'),
  ('UF3'),
  ('UF4'),
  ('UF5 (GUAY)')
ON CONFLICT (nombre) DO NOTHING;

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_tramites_proyectos_tramite ON tramites_proyectos(tramite_id);
CREATE INDEX IF NOT EXISTS idx_tramites_proyectos_proyecto ON tramites_proyectos(proyecto_id);

-- Habilitar RLS (Row Level Security)
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tramites_proyectos ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para proyectos
CREATE POLICY "Proyectos visibles para todos" ON proyectos FOR SELECT USING (true);
CREATE POLICY "Solo administradores pueden insertar proyectos" ON proyectos FOR INSERT WITH CHECK (true);
CREATE POLICY "Solo administradores pueden actualizar proyectos" ON proyectos FOR UPDATE USING (true);
CREATE POLICY "Solo administradores pueden eliminar proyectos" ON proyectos FOR DELETE USING (true);

-- Políticas de seguridad para tramites_proyectos
CREATE POLICY "Relaciones visibles para todos" ON tramites_proyectos FOR SELECT USING (true);
CREATE POLICY "Todos pueden crear relaciones" ON tramites_proyectos FOR INSERT WITH CHECK (true);
CREATE POLICY "Todos pueden actualizar relaciones" ON tramites_proyectos FOR UPDATE USING (true);
CREATE POLICY "Todos pueden eliminar relaciones" ON tramites_proyectos FOR DELETE USING (true);