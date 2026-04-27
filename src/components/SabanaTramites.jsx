import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './SabanaTramites.css';

const SUPABASE_URL = 'https://dwhbbetyoixfvfouvobh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_RSFfVjctftI6g_Cpayf8kQ_DBa7fnjA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const SabanaTramites = () => {
  const [tramites, setTramites] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [entidades, setEntidades] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [tramiteSeleccionado, setTramiteSeleccionado] = useState(null);
  const [showProyectosModal, setShowProyectosModal] = useState(false);

  // Estados para edición
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    fecha_radicacion: '',
    fecha_estimada: '',
    responsables: [],
    observacion: '',
    estado: '',
    proyectos_seleccionados: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      // Cargar trámites con proyectos relacionados
      const { data: tramitesData, error: tramitesError } = await supabase
        .from('tramites')
        .select(`
          *,
          responsable:perfiles(id, nombre_completo, email),
          entidad:entidades(id, entidad),
          
        `)
        .order('fecha_radicacion', { ascending: false });

      if (tramitesError) throw tramitesError;

      // Cargar perfiles
      const { data: perfilesData, error: perfilesError } = await supabase
        .from('perfiles')
        .select('*');

      if (perfilesError) throw perfilesError;

      // Cargar entidades
      const { data: entidadesData, error: entidadesError } = await supabase
        .from('entidades')
        .select('*');

      if (entidadesError) throw entidadesError;

      // Cargar proyectos
      const { data: proyectosData, error: proyectosError } = await supabase
        .from('proyectos')
        .select('*')
        .order('nombre', { ascending: true });

      if (proyectosError) throw proyectosError;

      setTramites(tramitesData || []);
      setPerfiles(perfilesData || []);
      setEntidades(entidadesData || []);
      setProyectos(proyectosData || []);
    } catch (error) {
      console.error('Error cargando datos:', error);
      alert('Error al cargar los datos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerNombreEntidad = (entidad_id) => {
    const entidad = entidades.find(e => e.id === entidad_id);
    return entidad ? entidad.entidad : 'Sin entidad';
  };

  const obtenerProyectos = (tramite) => {
    if (!tramite.proyectos || tramite.proyectos.length === 0) {
      return [];
    }
    return tramite.proyectos;
  };

  const iniciarEdicion = async (tramite) => {
    setEditingId(tramite.id);
    const proyectosDelTramite = tramite.proyectos || [];
    
    setEditFormData({
      nombre: tramite.nombre,
      fecha_radicacion: tramite.fecha_radicacion,
      fecha_estimada: tramite.fecha_estimada || '',
      responsables: tramite.responsables || [],
      observacion: tramite.observacion || '',
      estado: tramite.estado,
      proyectos_seleccionados: proyectosDelTramite
    });

    setTramiteSeleccionado(tramite.id);
  };

  const cancelarEdicion = () => {
    setEditingId(null);
    setTramiteSeleccionado(null);
    setShowProyectosModal(false);
    setEditFormData({
      nombre: '',
      fecha_radicacion: '',
      fecha_estimada: '',
      responsables: [],
    observacion: '',
      estado: '',
      proyectos_seleccionados: []
    });
  };

  const guardarCambios = async () => {
    if (!editFormData.nombre || !editFormData.fecha_radicacion || !editFormData.estado) {
      alert('Por favor completa los campos obligatorios (Nombre, Fecha Radicación, Estado)');
      return;
    }

    try {
      // Actualizar trámite
      const { error: updateError } = await supabase
        .from('tramites')
        .update({
          nombre: editFormData.nombre,
          fecha_radicacion: editFormData.fecha_radicacion,
          fecha_estimada: editFormData.fecha_estimada || null,
          responsables: editFormData.responsables || [],
          observacion: editFormData.observacion,
          estado: editFormData.estado,
          proyectos: editFormData.proyectos_seleccionados,
          actualizado_en: new Date().toISOString()
        })
        .eq('id', editingId);

      if (updateError) throw updateError;


      // Recargar datos
      await cargarDatos();
      cancelarEdicion();
      alert('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error guardando cambios:', error);
      alert('Error al guardar cambios: ' + error.message);
    }
  };

  const toggleProyecto = (proyectoId) => {
    setEditFormData(prev => ({
      ...prev,
      proyectos_seleccionados: prev.proyectos_seleccionados.includes(proyectoId)
        ? prev.proyectos_seleccionados.filter(id => id !== proyectoId)
        : [...prev.proyectos_seleccionados, proyectoId]
    }));
  };

  const eliminarTramite = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este trámite?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('tramites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await cargarDatos();
      alert('Trámite eliminado exitosamente');
    } catch (error) {
      console.error('Error eliminando trámite:', error);
      alert('Error al eliminar trámite: ' + error.message);
    }
  };

  const tramitesFiltrados = tramites.filter(tramite => {
    const estadoNormalizado = (tramite.estado || '').trim().toLowerCase();
    const filtroNormalizado = (filtroEstado || '').trim().toLowerCase();
    const cumpleFiltroEstado = filtroNormalizado === 'todos' || estadoNormalizado === filtroNormalizado;
    const cumpleBusqueda = (tramite.nombre || '').toLowerCase().includes(searchTerm.toLowerCase());
    return cumpleFiltroEstado && cumpleBusqueda;
  });

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    <div className="sabana-container">
      <div className="header">
        <h1>📋 Sábana de Trámites - Lagos de Torca</h1>
        <p>Gestión completa de trámites con asignación de proyectos</p>
      </div>

      <div className="filtros">
        <div className="filtro-grupo">
          <label>Filtrar por Estado:</label>
          <select 
            value={filtroEstado} 
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="select-filtro"
          >
            <option value="Todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Trámite">En Trámite</option>
            <option value="Cumplido">Cumplido</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Buscar:</label>
          <input 
            type="text" 
            placeholder="Buscar por nombre del trámite..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-busqueda"
          />
        </div>
      </div>

      <div className="tabla-contenedor">
        <table className="tabla-tramites">
          <thead>
            <tr>
              <th>Nombre del Trámite</th>
              <th>Entidad</th>
              <th>Fecha Radicación</th>
              <th>Fecha Estimada</th>
              <th>Responsable</th>
              <th>Estado</th>
              <th>Proyectos</th>
              <th>Observación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tramitesFiltrados.length === 0 ? (
              <tr>
                <td colSpan="9" className="sin-datos">No hay trámites que coincidan con los filtros</td>
              </tr>
            ) : (
              tramitesFiltrados.map(tramite => (
                <tr key={tramite.id} className={editingId === tramite.id ? 'fila-editando' : ''}>
                  {editingId === tramite.id ? (
                    <>
                      <td>
                        <input 
                          type="text" 
                          value={editFormData.nombre}
                          onChange={(e) => setEditFormData({...editFormData, nombre: e.target.value})}
                          className="input-edicion"
                        />
                      </td>
                      <td>
                        <div className="multi-select-container">
                          {perfiles.map(perfil => (
                            <label key={perfil.id} className="checkbox-label">
                              <input 
                                type="checkbox"
                                checked={(editFormData.responsables || []).includes(perfil.nombre_completo)}
                                onChange={(e) => {
                                  const selected = e.target.checked;
                                  const name = perfil.nombre_completo;
                                  setEditFormData(prev => ({
                                    ...prev,
                                    responsables: selected 
                                      ? [...(prev.responsables || []), name]
                                      : (prev.responsables || []).filter(r => r !== name)
                                  }));
                                }}
                              />
                              {perfil.nombre_completo}
                            </label>
                          ))}
                        </div>
                      </td>
                      <td>
                        <input 
                          type="date" 
                          value={editFormData.fecha_radicacion}
                          onChange={(e) => setEditFormData({...editFormData, fecha_radicacion: e.target.value})}
                          className="input-edicion"
                        />
                      </td>
                      <td>
                        <input 
                          type="date" 
                          value={editFormData.fecha_estimada}
                          onChange={(e) => setEditFormData({...editFormData, fecha_estimada: e.target.value})}
                          className="input-edicion"
                        />
                      </td>
                      <td>
                        <div className="multi-select-container">
                          {perfiles.map(perfil => (
                            <label key={perfil.id} className="checkbox-label">
                              <input 
                                type="checkbox"
                                checked={(editFormData.responsables || []).includes(perfil.nombre_completo)}
                                onChange={(e) => {
                                  const selected = e.target.checked;
                                  const name = perfil.nombre_completo;
                                  setEditFormData(prev => ({
                                    ...prev,
                                    responsables: selected 
                                      ? [...(prev.responsables || []), name]
                                      : (prev.responsables || []).filter(r => r !== name)
                                  }));
                                }}
                              />
                              {perfil.nombre_completo}
                            </label>
                          ))}
                        </div>
                      </td>
                      <td>
                        <select 
                          value={editFormData.estado}
                          onChange={(e) => setEditFormData({...editFormData, estado: e.target.value})}
                          className="input-edicion"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En Trámite">En Trámite</option>
                          <option value="Cumplido">Cumplido</option>
                          <option value="Vencido">Vencido</option>
                        </select>
                      </td>
                      <td>
                        <button 
                          className="btn-proyectos"
                          onClick={() => setShowProyectosModal(true)}
                        >
                          {editFormData.proyectos_seleccionados.length} 
                          {editFormData.proyectos_seleccionados.length === 1 ? ' Proyecto' : ' Proyectos'}
                        </button>
                      </td>
                      <td>
                        <textarea 
                          value={editFormData.observacion}
                          onChange={(e) => setEditFormData({...editFormData, observacion: e.target.value})}
                          className="input-edicion textarea-edicion"
                          rows="2"
                        />
                      </td>
                      <td className="celda-acciones">
                        <button 
                          className="btn-guardar"
                          onClick={guardarCambios}
                        >
                          ✓ Guardar
                        </button>
                        <button 
                          className="btn-cancelar"
                          onClick={cancelarEdicion}
                        >
                          ✕ Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="celda-nombre">{tramite.nombre}</td>
                      <td>{obtenerNombreEntidad(tramite.entidad_id)}</td>
                      <td>{new Date(tramite.fecha_radicacion).toLocaleDateString('es-CO')}</td>
                      <td>{tramite.fecha_estimada ? new Date(tramite.fecha_estimada).toLocaleDateString('es-CO') : '-'}</td>
                      <td>{tramite.responsables && tramite.responsables.length > 0 ? tramite.responsables.join(', ') : 'Sin responsables'}</td>
                      <td>
                        <span className={`badge estado-${tramite.estado.toLowerCase().replace(' ', '-')}`}>
                          {tramite.estado}
                        </span>
                      </td>
                      <td>
                        <div className="proyectos-cell">
                          {!tramite.proyectos || tramite.proyectos.length === 0 ? (
                            <span className="sin-proyectos">Sin proyectos</span>
                          ) : (
                            <div className="proyectos-lista">
                              {tramite.proyectos.map((proyecto, idx) => (
                                <span key={idx} className="proyecto-badge">
                                  {proyecto}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="celda-observacion">{tramite.observacion || '-'}</td>
                      <td className="celda-acciones">
                        <button 
                          className="btn-editar"
                          onClick={() => iniciarEdicion(tramite)}
                        >
                          ✎ Editar
                        </button>
                        <button 
                          className="btn-eliminar"
                          onClick={() => eliminarTramite(tramite.id)}
                        >
                          🗑 Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Selección de Proyectos */}
      {showProyectosModal && (
        <div className="modal-overlay" onClick={() => setShowProyectosModal(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Seleccionar Proyectos</h2>
              <button 
                className="btn-cerrar"
                onClick={() => setShowProyectosModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="proyectos-grid">
                {proyectos.map(proyecto => (
                  <label key={proyecto.id} className="proyecto-checkbox">
                    <input 
                      type="checkbox" 
                      checked={editFormData.proyectos_seleccionados.includes(proyecto.id)}
                      onChange={() => toggleProyecto(proyecto.id)}
                    />
                    <span className="proyecto-nombre">{proyecto.nombre}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-confirmar"
                onClick={() => setShowProyectosModal(false)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="footer-info">
        <p>Total de trámites: <strong>{tramites.length}</strong></p>
        <p>Trámites mostrados: <strong>{tramitesFiltrados.length}</strong></p>
      </div>
    </div>
  );
};

export default SabanaTramites;
