import { useState, useEffect } from 'react';
import { useModelos } from '@/hooks/useModelos';
import type { Modelo } from '@/types/BackendTypes';
import { useNavigate } from 'react-router-dom';

export const ModelManagementView = () => {
  const {
    getAllModelos,
    getDeletedModelos,
    softDeleteModelo,
    recoverModelo,
    syncModelos,
    trainCustomModelo,
    toggleProductionModelo,
    loading
  } = useModelos();

  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [trainConfig, setTrainConfig] = useState<{
    name: string;
    dataset: string;
    file: File | null;
    algorithm: string;
    hyperparameters: Record<string, unknown>;
  }>({
    name: '',
    dataset: '',
    file: null,
    algorithm: 'svm',
    hyperparameters: {
      kernel: 'linear',
      C: 1.0,
      probability: true,
      ngram_range: [1, 3],
      min_df: 4,
      max_df: 0.8,
      cv_folds: 5,
      random_state: 42,
    },
  });
  const navigate = useNavigate();

  const algorithmOptions = [
    { value: 'svm', label: 'SVM (Prioridad)' },
    { value: 'random_forest', label: 'Random Forest' },
    { value: 'xgboost', label: 'XGBoost' },
    { value: 'naive_bayes', label: 'Naive Bayes' },
  ];

  const handleAlgorithmChange = (algo: string) => {
    const defaults: Record<string, Record<string, unknown>> = {
      svm: { kernel: 'linear', C: 1.0, probability: true },
      random_forest: { n_estimators: 200, max_depth: null, class_weight: 'balanced' },
      xgboost: { max_depth: 6, learning_rate: 0.1, n_estimators: 100, eval_metric: 'logloss' },
      naive_bayes: { alpha: 1.0 },
    };
    const algoDefaults = defaults[algo] || {};
    setTrainConfig(prev => ({
      ...prev,
      algorithm: algo,
      hyperparameters: {
        ...prev.hyperparameters,
        ...algoDefaults,
      },
    }));
  };

  const updateHyperparam = (key: string, value: unknown) => {
    setTrainConfig(prev => ({
      ...prev,
      hyperparameters: {
        ...prev.hyperparameters,
        [key]: value,
      },
    }));
  };

  const loadData = async () => {
    try {
      const active = await getAllModelos();
      const deleted = await getDeletedModelos();

      const all: Modelo[] = [
        ...active.map((m: Modelo) => ({ ...m, is_active: true })),
        ...deleted.map((m: Modelo) => ({ ...m, is_active: false }))
      ];

      all.sort((a, b) => new Date(b.fecha_entrenamiento).getTime() - new Date(a.fecha_entrenamiento).getTime());
      setModelos(all);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSync = async () => {
    await syncModelos();
    loadData();
  };

  const handleToggleActive = async (modelo: Modelo) => {
    if (modelo.is_active) {
      if (confirm(`¿Seguro que deseas desactivar el modelo ${modelo.nombre_modelo}?`)) {
        await softDeleteModelo(modelo.id_modelo);
        loadData();
      }
    } else {
      await recoverModelo(modelo.id_modelo);
      loadData();
    }
  };

  const handleToggleProduction = async (modelo: Modelo) => {
    try {
      await toggleProductionModelo(modelo.id_modelo);
      loadData();
    } catch (e) {
      console.error(e);
      alert("Error al cambiar estado de producción");
    }
  };

  const handleTrain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await trainCustomModelo(
        trainConfig.file,
        trainConfig.dataset,
        trainConfig.name,
        trainConfig.algorithm,
        trainConfig.hyperparameters,
      );
      const respObj = resp as { message?: string };
      alert(respObj?.message || "El entrenamiento ha comenzado. Esto tomará varios minutos.");
      setShowTrainModal(false);
      setTrainConfig({
        name: '',
        dataset: '',
        file: null,
        algorithm: 'svm',
        hyperparameters: {
          kernel: 'linear',
          C: 1.0,
          probability: true,
          ngram_range: [1, 3],
          min_df: 4,
          max_df: 0.8,
          cv_folds: 5,
          random_state: 42,
        },
      });
      loadData();
    } catch (e) {
      console.error(e);
      alert("Error al iniciar el entrenamiento.");
    }
  };

  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border min-h-[500px] relative transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Gestión de Modelos (Admin)</h2>
          <p className="text-sm text-muted-foreground">Administra los modelos de IA desplegados en la plataforma</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSync}
            disabled={loading}
            className="px-4 py-2 bg-muted text-foreground rounded-md text-sm font-semibold hover:bg-muted/80 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Sincronizando...' : 'Sincronizar Modelos'}
          </button>
          <button
            onClick={() => setShowTrainModal(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors duration-300"
          >
            Entrenar Nuevo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border border border-border rounded-lg overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Algoritmo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Métricas</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Producción</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {modelos.map(m => (
              <tr key={m.id_modelo} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground border-l-4" style={{ borderLeftColor: m.is_active ? '#10b981' : '#ef4444' }}>
                  {m.nombre_modelo}
                  <div className="text-[11px] text-muted-foreground font-normal">{new Date(m.fecha_entrenamiento).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {m.entrenamientos && m.entrenamientos[0]?.algorithm
                    ? m.entrenamientos[0].algorithm.toUpperCase()
                    : "SVM"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {m.precision ? (m.precision * 100).toFixed(1) + "%" : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-[11px] leading-5 font-semibold rounded-full ${m.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {m.is_active ? 'Activo' : 'Soft Deleted'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {m.is_active ? (
                    <button
                      onClick={() => handleToggleProduction(m)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${m.is_production ? 'bg-emerald-500' : 'bg-muted'} transition-colors duration-200 ease-in-out`}
                    >
                      <span className="sr-only">Toggle Producción</span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${m.is_production ? 'translate-x-2' : '-translate-x-2'}`}
                      />
                    </button>
                  ) : (
                    <span className="text-muted-foreground text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => navigate(`/reports?modelo=${m.id_modelo}`)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Métricas
                  </button>
                  <button
                    onClick={() => handleToggleActive(m)}
                    className={m.is_active ? "text-destructive hover:text-destructive/80 transition-colors" : "text-emerald-500 hover:text-emerald-700 transition-colors"}
                  >
                    {m.is_active ? 'Desactivar' : 'Recuperar'}
                  </button>
                </td>
              </tr>
            ))}
            {modelos.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">
                  No hay modelos disponibles. Sincroniza o entrena uno nuevo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showTrainModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-2xl backdrop-blur-sm">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Entrenar Nuevo Modelo</h3>
            <p className="text-xs text-muted-foreground mb-6">Configura el nombre y dataset a procesar por el MLCore (FastAPI). Por defecto usará el dataset de consolidado diagnóstico.</p>

            <form onSubmit={handleTrain} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nombre Personalizado (Opcional)</label>
                <input
                  type="text"
                  value={trainConfig.name}
                  onChange={e => setTrainConfig({ ...trainConfig, name: e.target.value })}
                  placeholder="ej. v2_clinical_advanced"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Algoritmo</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                  value={trainConfig.algorithm}
                  onChange={e => handleAlgorithmChange(e.target.value)}
                >
                  {algorithmOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="border border-border rounded-md p-3 bg-muted/50">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Hiperparámetros del Algoritmo</h4>
                <div className="space-y-3">
                  {trainConfig.algorithm === 'svm' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Kernel</label>
                        <select
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                          value={String(trainConfig.hyperparameters.kernel || 'linear')}
                          onChange={e => updateHyperparam('kernel', e.target.value)}
                        >
                          <option value="linear">linear</option>
                          <option value="rbf">rbf</option>
                          <option value="poly">poly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">C (Regularización)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          max="10"
                          value={Number(trainConfig.hyperparameters.C || 1.0)}
                          onChange={e => updateHyperparam('C', parseFloat(e.target.value))}
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(trainConfig.hyperparameters.probability)}
                          onChange={e => updateHyperparam('probability', e.target.checked)}
                          className="h-4 w-4 text-primary focus:ring-primary border-border rounded transition-colors"
                        />
                        <label className="text-xs text-muted-foreground">Probability</label>
                      </div>
                    </>
                  )}
                  {trainConfig.algorithm === 'random_forest' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">N Estimators</label>
                        <input
                          type="number"
                          min="10"
                          max="1000"
                          value={Number(trainConfig.hyperparameters.n_estimators || 200)}
                          onChange={e => updateHyperparam('n_estimators', parseInt(e.target.value))}
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Max Depth</label>
                        <input
                          type="number"
                          min="1"
                          placeholder="null (sin límite)"
                          value={trainConfig.hyperparameters.max_depth === null || trainConfig.hyperparameters.max_depth === undefined ? '' : Number(trainConfig.hyperparameters.max_depth)}
                          onChange={e => updateHyperparam('max_depth', e.target.value === '' ? null : parseInt(e.target.value))}
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Class Weight</label>
                        <select
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                          value={String(trainConfig.hyperparameters.class_weight || 'balanced')}
                          onChange={e => updateHyperparam('class_weight', e.target.value)}
                        >
                          <option value="balanced">balanced</option>
                          <option value="balanced_subsample">balanced_subsample</option>
                          <option value="">None</option>
                        </select>
                      </div>
                    </>
                  )}
                  {trainConfig.algorithm === 'xgboost' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Max Depth</label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={Number(trainConfig.hyperparameters.max_depth || 6)}
                          onChange={e => updateHyperparam('max_depth', parseInt(e.target.value))}
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Learning Rate (Tasa de Aprendizaje)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          max="1"
                          value={Number(trainConfig.hyperparameters.learning_rate || 0.1)}
                          onChange={e => updateHyperparam('learning_rate', parseFloat(e.target.value))}
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">N Estimators</label>
                        <input
                          type="number"
                          min="10"
                          max="1000"
                          value={Number(trainConfig.hyperparameters.n_estimators || 100)}
                          onChange={e => updateHyperparam('n_estimators', parseInt(e.target.value))}
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Eval Metric</label>
                        <select
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                          value={String(trainConfig.hyperparameters.eval_metric || 'logloss')}
                          onChange={e => updateHyperparam('eval_metric', e.target.value)}
                        >
                          <option value="logloss">logloss</option>
                          <option value="error">error</option>
                          <option value="auc">auc</option>
                        </select>
                      </div>
                    </>
                  )}
                  {trainConfig.algorithm === 'naive_bayes' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">Alpha (Smoothing)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={Number(trainConfig.hyperparameters.alpha || 1.0)}
                          onChange={e => updateHyperparam('alpha', parseFloat(e.target.value))}
                          className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="border border-border rounded-md p-3 bg-muted/50">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Pipeline General (TF-IDF & Validación)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">N-Gram Range</label>
                    <select
                      className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                      value={String((trainConfig.hyperparameters.ngram_range as number[] || [1,3]).join(','))}
                      onChange={e => {
                        const [a, b] = e.target.value.split(',').map(Number);
                        updateHyperparam('ngram_range', [a, b]);
                      }}
                    >
                      <option value="1,1">1-1</option>
                      <option value="1,2">1-2</option>
                      <option value="1,3">1-3</option>
                      <option value="2,3">2-3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Min DF</label>
                    <input
                      type="number"
                      min="1"
                      value={Number(trainConfig.hyperparameters.min_df || 4)}
                      onChange={e => updateHyperparam('min_df', parseInt(e.target.value))}
                      className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Max DF</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="1.0"
                      value={Number(trainConfig.hyperparameters.max_df || 0.8)}
                      onChange={e => updateHyperparam('max_df', parseFloat(e.target.value))}
                      className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">CV Folds</label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={Number(trainConfig.hyperparameters.cv_folds || 5)}
                      onChange={e => updateHyperparam('cv_folds', parseInt(e.target.value))}
                      className="w-full px-2 py-1.5 border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subir Dataset Nuevo (CSV)</label>
                <input
                  type="file"
                  accept=".csv,.zip"
                  onChange={e => setTrainConfig({ ...trainConfig, file: e.target.files ? e.target.files[0] : null, dataset: '' })}
                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                />
                <p className="text-[10px] text-muted-foreground mt-1">Opcional. Dará precedencia sobre la selección inferior si se provee.</p>
              </div>

              <div className={trainConfig.file ? "opacity-40 pointer-events-none mt-4" : "mt-4"}>
                <label className="block text-sm font-medium text-foreground mb-1">O selecciona dataset existente</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-300"
                  value={trainConfig.dataset}
                  onChange={e => setTrainConfig({ ...trainConfig, dataset: e.target.value })}
                  disabled={!!trainConfig.file}
                >
                  <option value="">Consolidado Diagnóstico (Por Defecto)</option>
                  <option value="consolidado_etiquetado.csv">consolidado_etiquetado.csv</option>
                  <option value="consolidado_historia_clinica.csv">consolidado_historia_clinica.csv</option>
                </select>
                <p className="text-[10px] text-muted-foreground mt-2">Puedes seleccionar un dataset diferente si está montado en /Prototipe.</p>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowTrainModal(false)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:bg-muted rounded-md transition-colors duration-300">
                  Cancelar
                </button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-md transition-colors duration-300 shadow-sm">
                  {loading ? 'Iniciando...' : 'Iniciar Entrenamiento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
