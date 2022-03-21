const LOGIN_DATA = 'loginData'
const EMPLOYEE_DATA = 'empData'

export const logout = () => {
    localStorage.removeItem(LOGIN_DATA);
    localStorage.removeItem(EMPLOYEE_DATA);

}

export const isLogin = () => {
    if (localStorage.getItem(LOGIN_DATA)) {
        return true;
    }

    return false;
}