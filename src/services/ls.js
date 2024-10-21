export default {
  get(key) {
    const data = localStorage.getItem(key) ? localStorage.getItem(key) : null
    if(data !== null && data.startsWith("{") && data.endsWith("}")){
      return JSON.parse(data);
    }
    return data;
  },
  isLoggedIn(){
    return this.get('auth.token')?true:false
  },
  set(key, val) {
    localStorage.setItem(key, val)
  },

  remove(key) {
    localStorage.removeItem(key)
  },
  permissions(){
    const userPermissions = this.get('permissions');
    return userPermissions;
  },
  account_type(){
   return this.get('auth.user')?.account_type;
  },
  hasPermission(permission){
    if(this.get('auth.user_type') != 'app'){
      if(this.account_type() == 'super_admin'){
        return true;
      }
    }
  return true;
    //return this.permissions().includes(permission)
  }
}
