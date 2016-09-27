export const setTemplateFile = file => ({
  type: 'SET_TEMPLATE_FILE',
  file
});

export const resetTemplateFile = () => ({
  type: 'RESET_TEMPLATE_FILE'
});

export const setDataFile = file => ({
  type: 'SET_DATA_FILE',
  file
});

export const resetDataFile = () => ({
  type: 'RESET_DATA_FILE'
});
