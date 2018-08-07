import {
    Map as IMap
} from 'immutable';

export const EMPLOYEE_INDEX = 'employee_index';
export const EMPLOYEE_TYPE = 'employee_type';
export const MAX_RESULTS = 1000;

const USER_NAME_FIELD = 'USER_NAME';
const USER_SSO_FIELD = 'USER_SSO';
const BACKGROUND_FLAG_FIELD = 'BACKGROUND_FLAG';
const EMPLOYEE_ID_FIELD = 'EMPLOYEE_ID';

const USER_NAME_COLUMN = 'username';
const USER_SSO_COLUMN = 'usersso';
const BACKGROUND_FLAG_COLUMN = 'backgroundflag';
const EMPLOYEE_ID_COLUMN = 'employeeid';

export const esColumnMapping = IMap({
    [USER_NAME_FIELD]: [USER_NAME_COLUMN],
    [USER_SSO_FIELD]: [USER_SSO_COLUMN],
    [BACKGROUND_FLAG_FIELD]: [BACKGROUND_FLAG_COLUMN],
    [EMPLOYEE_ID_FIELD]: [EMPLOYEE_ID_COLUMN]
});

export const DEPARTMENT_INDEX = 'department_index';
export const DEPARTMENT_TYPE = 'department_type';

const DEPARTMENT_ID_FIELD = 'DEPARTMENT_ID';
const DEPARTMENT_NAME_FIELD = 'DEPARTMENT_NAME';
const DEPARTMENT_MANAGER_FIELD = 'DEPARTMENT_MANAGER';

const DEPARTMENT_ID_COLUMN = 'deptId';
const DEPARTMENT_NAME_COLUMN = 'deptName';
const DEPARTMENT_MANAGER_COLUMN = 'deptManager';

export const dsColumnMapping = IMap({
    [DEPARTMENT_ID_FIELD]: [DEPARTMENT_ID_COLUMN],
    [DEPARTMENT_NAME_FIELD]: [DEPARTMENT_NAME_COLUMN],
    [DEPARTMENT_MANAGER_FIELD]: [DEPARTMENT_MANAGER_COLUMN],
});