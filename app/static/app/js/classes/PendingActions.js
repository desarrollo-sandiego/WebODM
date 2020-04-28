const CANCEL = 1,
      REMOVE = 2,
      RESTART = 3,
      RESIZE = 4,
      IMPORT = 5;

let pendingActions = {
    [CANCEL]: {
        descr: "Cancelando..."
    },
    [REMOVE]: {
        descr: "Eliminando..."
    },
    [RESTART]: {
        descr: "Reiniciando..."
    },
    [RESIZE]: {
      descr: "Preparando las imágenes para procesar..."
    },
    [IMPORT]: {
      descr: "Importando..."
    }
};

export default {
    CANCEL: CANCEL,
    REMOVE: REMOVE,
    RESTART: RESTART,
    RESIZE: RESIZE,
    IMPORT: IMPORT,

    description: function(pendingAction) {
      if (pendingActions[pendingAction]) return pendingActions[pendingAction].descr;
      else return "";
    }
};

