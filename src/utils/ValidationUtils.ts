export const requiredFields = {
  DataSource: ['name', 'plcAddress', 'plcSlot', 'timeout'],
  General: ['auth_user', 'auth_password', 'api_port'],
  Points: ['plcName', 'plcTag', 'pointName', 'description', 'decimals']
};

export const validationRules = {
  General: {
    auth_user: { type: 'ANY' },
    auth_password: { type: 'ANY' },
    api_port: { type: 'WHOLE', min: 1024, max: 65535 }
  },
  DataSource: {
    name: { type: 'ANY', unique: true },
    plcAddress: { type: 'ANY', unique: true },
    plcSlot: { type: 'WHOLE', min: 0, max: 9 },
    timeout: { type: 'WHOLE', min: 0, max: 99999 }
  },
  Points: {
    plcName: { type: 'ANY' },
    plcTag: { type: 'STRING', regex: /^[a-zA-Z_][a-zA-Z0-9_.-]*$/, unique: true }, 
    pointName: { type: 'STRING', regex: /^[a-zA-Z_][a-zA-Z0-9_.-]*$/, unique: true },
    description: { type: 'ANY' },
    decimals: { type: 'WHOLE', min: 0, max: 6 },
    unit: { type: 'ANY' },
    rawLow: { type: 'DECIMAL', min: -2147483648, max: 2147483647 },
    rawHigh: { type: 'DECIMAL', min: -2147483648, max: 2147483647 },
    EULow: { type: 'DECIMAL', min: -2147483648, max: 2147483647 },
    EUHigh: { type: 'DECIMAL', min: -2147483648, max: 2147483647 }
  }
};

export const validateData = (data: any, requiredFields: string[], rules: any): boolean => {
  return requiredFields.every((field) => {
    const value = data[field];
    const rule = rules[field];

    if (value === '' || value === null || value === undefined) return false;

    switch (rule?.type) {
      case 'WHOLE':
        return Number.isInteger(value) && (rule.min === undefined || value >= rule.min) && (rule.max === undefined || value <= rule.max);
      case 'DECIMAL':
        return typeof value === 'number' && (rule.min === undefined || value >= rule.min) && (rule.max === undefined || value <= rule.max);
      case 'STRING':
        return typeof value === 'string' && (!rule.regex || rule.regex.test(value));
      default:
        return true;
    }
  });
};

export const validateUniqueFields = (dataArray: any[], uniqueFields: string[]): boolean => {
  return uniqueFields.every((field) => {
    const values = dataArray.map((item) => item[field]);
    const uniqueValues = new Set(values);
    return uniqueValues.size === values.length;
  });
};

export const validateAllData = (data: any): string | null => {
  const isGeneralValid = data.General?.every((item: any) => validateData(item, requiredFields.General, validationRules.General));
  const isDataSourceValid = data.DataSource?.every((item: any) => validateData(item, requiredFields.DataSource, validationRules.DataSource));
  const isPointsValid = data.Points?.every((item: any) => validateData(item, requiredFields.Points, validationRules.Points));

  if (!isGeneralValid || !isDataSourceValid || !isPointsValid) {
    return 'Alguns campos obrigatórios estão vazios ou contêm valores inválidos.';
  }

  if (!validateUniqueFields(data.DataSource, ['name', 'plcAddress']) || !validateUniqueFields(data.Points, ['plcTag', 'pointName'])) {
    return 'Existem valores duplicados nos campos que devem ser únicos.';
  }

  return null;
};