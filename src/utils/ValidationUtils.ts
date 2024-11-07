export const requiredFields = {
  DataSource: ['name', 'plcAddress', 'plcSlot', 'timeout'],
  General: ['auth_user', 'auth_password', 'api_port'],
  Points: ['plcName', 'plcTag', 'pointName', 'description', 'decimals']
};

export const validateData = (data: any, requiredFields: string[]): boolean => {
  return requiredFields.every(field => data[field] !== '' && data[field] !== null && data[field] !== undefined);
};

export const validateAllData = (data: any): string | null => {
  const isGeneralValid = data.General?.every((item: any) => validateData(item, requiredFields.General));
  const isDataSourceValid = data.DataSource?.every((item: any) => validateData(item, requiredFields.DataSource));
  const isPointsValid = data.Points?.every((item: any) => validateData(item, requiredFields.Points));

  return isGeneralValid && isDataSourceValid && isPointsValid
    ? null
    : 'Campos obrigatórios não encontrados.';
};